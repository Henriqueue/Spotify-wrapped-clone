const LASTFM_KEY = process.env.NEXT_PUBLIC_LASTFM_API_KEY ?? "";
const LASTFM_BASE = "https://ws.audioscrobbler.com/2.0";
const CAA_BASE = "https://coverartarchive.org";
const MB_BASE = "https://musicbrainz.org/ws/2";
const MB_HEADERS = {
  "User-Agent": "LastfmWrapped/1.0 (github.com/seu-usuario/lastfm-wrapped)",
  Accept: "application/json",
};

const cache = new Map<string, string>();

// ─── FOTOS DE ARTISTAS via Wikipedia Thumbnail API ───────────────────────────

export async function getArtistImage(artist: string): Promise<string> {
  const key = `artist:${artist}`;
  if (cache.has(key)) return cache.get(key)!;

  try {
    // Wikipedia API — retorna thumbnail da página do artista
    const title = encodeURIComponent(artist);
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "LastfmWrapped/1.0" },
    });
    if (!res.ok) throw new Error("not found");
    const data = await res.json();
    const img: string = data?.thumbnail?.source ?? "";
    cache.set(key, img);
    return img;
  } catch {
    cache.set(key, "");
    return "";
  }
}

// ─── CAPAS DE ÁLBUNS via Cover Art Archive (MBID do CSV) ─────────────────────

export async function getAlbumImageByMbid(mbid: string): Promise<string> {
  if (!mbid) return "";
  const key = `caa:${mbid}`;
  if (cache.has(key)) return cache.get(key)!;

  try {
    // CAA retorna redirect direto para a imagem front — sem parsing de JSON
    const url = `${CAA_BASE}/release-group/${mbid}/front-500`;
    // Checa se o redirect resolve (HEAD request)
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    const img = res.ok ? url : "";
    cache.set(key, img);
    return img;
  } catch {
    cache.set(key, "");
    return "";
  }
}

// Fallback: busca MBID do álbum pelo nome via MusicBrainz, depois pega capa
export async function getAlbumImage(
  artist: string,
  album: string
): Promise<string> {
  const key = `album:${artist}:${album}`;
  if (cache.has(key)) return cache.get(key)!;

  try {
    // 1. Busca o release-group MBID no MusicBrainz
    const q = encodeURIComponent(`release:"${album}" AND artist:"${artist}"`);
    const mbUrl = `${MB_BASE}/release-group?query=${q}&limit=1&fmt=json`;
    const mbRes = await fetch(mbUrl, { headers: MB_HEADERS });
    if (!mbRes.ok) throw new Error("mb fail");
    const mbData = await mbRes.json();
    const mbid: string = mbData?.["release-groups"]?.[0]?.id ?? "";
    if (!mbid) throw new Error("no mbid");

    // 2. Busca a capa no Cover Art Archive
    const img = await getAlbumImageByMbid(mbid);
    cache.set(key, img);
    return img;
  } catch {
    // Fallback: Last.fm ainda retorna capas de álbum
    try {
      const url = `${LASTFM_BASE}/?method=album.getinfo&artist=${encodeURIComponent(artist)}&album=${encodeURIComponent(album)}&api_key=${LASTFM_KEY}&format=json`;
      const res = await fetch(url);
      const data = await res.json();
      const images: { size: string; "#text": string }[] = data?.album?.image ?? [];
      const img =
        images.find((i) => i.size === "extralarge")?.["#text"] ||
        images.find((i) => i.size === "large")?.["#text"] ||
        "";
      cache.set(key, img);
      return img;
    } catch {
      cache.set(key, "");
      return "";
    }
  }
}

// ─── ORQUESTRADOR PRINCIPAL ───────────────────────────────────────────────────

export async function enrichWithImages(data: {
  topArtists: { name: string; count: number }[];
  topAlbums: { name: string; count: number; artist?: string; mbid?: string }[];
  topSongs: { name: string; count: number; artist?: string; mbid?: string }[];
  monthlyArtists?: { artist: string }[];
}): Promise<{
  artistImages: Record<string, string>;
  albumImages: Record<string, string>;
  songImages: Record<string, string>;
}> {
  const TOP = 5;

  // Artistas únicos para buscar foto (top 5 + artistas do mês)
  const artistNames = [
    ...data.topArtists.slice(0, TOP).map((a) => a.name),
    ...(data.monthlyArtists?.map((m) => m.artist) ?? []),
  ];
  const uniqueArtists = [...new Set(artistNames)];

  const artistPromises = uniqueArtists.map(async (name) => {
    const img = await getArtistImage(name);
    return [name, img] as [string, string];
  });

  const albumPromises = data.topAlbums.slice(0, TOP).map(async (a) => {
    // Usa MBID do CSV se disponível (mais rápido e preciso)
    const img = a.mbid
      ? await getAlbumImageByMbid(a.mbid)
      : await getAlbumImage(a.artist ?? "", a.name);
    return [a.name, img] as [string, string];
  });

  // Músicas usam a capa do álbum da mesma faixa via Last.fm
  const songPromises = data.topSongs.slice(0, TOP).map(async (s) => {
    try {
      const url = `${LASTFM_BASE}/?method=track.getinfo&artist=${encodeURIComponent(s.artist ?? "")}&track=${encodeURIComponent(s.name)}&api_key=${LASTFM_KEY}&format=json`;
      const res = await fetch(url);
      const json = await res.json();
      const images: { size: string; "#text": string }[] =
        json?.track?.album?.image ?? [];
      const img =
        images.find((i) => i.size === "extralarge")?.["#text"] ||
        images.find((i) => i.size === "large")?.["#text"] ||
        "";
      return [s.name, img] as [string, string];
    } catch {
      return [s.name, ""] as [string, string];
    }
  });

  const [artistEntries, albumEntries, songEntries] = await Promise.all([
    Promise.all(artistPromises),
    Promise.all(albumPromises),
    Promise.all(songPromises),
  ]);

  return {
    artistImages: Object.fromEntries(artistEntries),
    albumImages: Object.fromEntries(albumEntries),
    songImages: Object.fromEntries(songEntries),
  };
}