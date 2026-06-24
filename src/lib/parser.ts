import Papa from "papaparse";
import type { ScrobbleRaw, WrappedData, TopItem, MonthlyArtist } from "@/types";

export function parseCSV(file: File): Promise<ScrobbleRaw[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<ScrobbleRaw>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(new Error(`Erro ao ler CSV: ${error.message}`)),
    });
  });
}

function countItems(items: string[]): TopItem[] {
  const counts: Record<string, number> = {};
  for (const item of items) {
    if (item?.trim()) counts[item] = (counts[item] || 0) + 1;
  }
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

function countItemsWithMeta(
  pairs: { name: string; artist: string; mbid: string }[]
): TopItem[] {
  const counts: Record<string, { count: number; artist: string; mbid: string }> = {};
  for (const { name, artist, mbid } of pairs) {
    if (!name?.trim()) continue;
    counts[name] = {
      count: (counts[name]?.count || 0) + 1,
      artist: counts[name]?.artist || artist,
      mbid: counts[name]?.mbid || mbid,
    };
  }
  return Object.entries(counts)
    .map(([name, { count, artist, mbid }]) => ({ name, count, artist, mbid }))
    .sort((a, b) => b.count - a.count);
}

function guessGenres(artists: string[]): TopItem[] {
  const genreMap: Record<string, string> = {
    Radiohead: "Alternative", "The Beatles": "Rock", "Daft Punk": "Electronic",
    Beyoncé: "Pop", "Kendrick Lamar": "Hip-Hop", "Taylor Swift": "Pop",
    "Arctic Monkeys": "Indie Rock", "Frank Ocean": "R&B",
    "Tame Impala": "Psychedelic", "Mac Miller": "Hip-Hop",
  };
  const genreCounts: Record<string, number> = {};
  for (const artist of artists) {
    const genre = genreMap[artist] || "Other";
    genreCounts[genre] = (genreCounts[genre] || 0) + 1;
  }
  return Object.entries(genreCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

const MONTH_LABELS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function calcMonthlyArtists(scrobbles: ScrobbleRaw[]): MonthlyArtist[] {
  const byMonth: Record<number, Record<string, number>> = {};
  for (const s of scrobbles) {
    const ts = parseInt(s.uts);
    if (isNaN(ts) || !s.artist?.trim()) continue;
    const month = new Date(ts * 1000).getMonth() + 1;
    if (!byMonth[month]) byMonth[month] = {};
    byMonth[month][s.artist] = (byMonth[month][s.artist] || 0) + 1;
  }
  return Object.entries(byMonth)
    .map(([monthStr, artistCounts]) => {
      const month = parseInt(monthStr);
      const [artist, count] = Object.entries(artistCounts).sort((a, b) => b[1] - a[1])[0];
      return { month, monthLabel: MONTH_LABELS[month - 1], artist, count };
    })
    .sort((a, b) => a.month - b.month);
}

// Extrai todos os anos disponíveis no CSV
export function getAvailableYears(scrobbles: ScrobbleRaw[]): string[] {
  const years = new Set<string>();
  for (const s of scrobbles) {
    const ts = parseInt(s.uts);
    if (!isNaN(ts)) years.add(String(new Date(ts * 1000).getFullYear()));
  }
  return [...years].sort((a, b) => Number(b) - Number(a)); // mais recente primeiro
}

// Filtra scrobbles por ano (string "2024", "2023", etc.)
export function filterByYear(scrobbles: ScrobbleRaw[], year: string): ScrobbleRaw[] {
  return scrobbles.filter((s) => {
    const ts = parseInt(s.uts);
    return !isNaN(ts) && String(new Date(ts * 1000).getFullYear()) === year;
  });
}

export function processScrobbles(scrobbles: ScrobbleRaw[], year: string): WrappedData {
  const filtered = filterByYear(scrobbles, year);
  const allYears = getAvailableYears(scrobbles);

  const artists = filtered.map((s) => s.artist).filter(Boolean);

  const albumPairs = filtered
    .filter((s) => s.album?.trim())
    .map((s) => ({ name: s.album, artist: s.artist, mbid: s.album_mbid ?? "" }));

  const songPairs = filtered
    .filter((s) => s.track?.trim())
    .map((s) => ({ name: s.track, artist: s.artist, mbid: s.track_mbid ?? "" }));

  const hourCounts = new Array(24).fill(0);
  for (const s of filtered) {
    const ts = parseInt(s.uts);
    if (!isNaN(ts)) hourCounts[new Date(ts * 1000).getHours()]++;
  }

  return {
    year,
    totalScrobbles: filtered.length,
    topSongs: countItemsWithMeta(songPairs).slice(0, 10),
    topArtists: countItems(artists).slice(0, 10),
    topAlbums: countItemsWithMeta(albumPairs).slice(0, 10),
    topGenres: guessGenres(artists).slice(0, 8),
    hourlyDistribution: hourCounts.map((count, hour) => ({ hour, count })),
    topListeningHour: hourCounts.indexOf(Math.max(...hourCounts)),
    monthlyArtists: calcMonthlyArtists(filtered),
    availableYears: allYears,
  };
}