import Papa from "papaparse";
import type { ScrobbleRaw, WrappedData, TopItem } from "@/types";

// Lê o arquivo CSV e retorna um array de scrobbles brutos
export function parseCSV(file: File): Promise<ScrobbleRaw[]> {
  return new Promise((resolve, reject) => {
    Papa.parse<ScrobbleRaw>(file, {
      header: true,          // Usa a primeira linha como chave dos objetos
      skipEmptyLines: true,  // Ignora linhas vazias
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(new Error(`Erro ao ler CSV: ${error.message}`));
      },
    });
  });
}

// Conta ocorrências de cada item em um array de strings
function countItems(items: string[]): TopItem[] {
  const counts: Record<string, number> = {};

  for (const item of items) {
    if (item && item.trim()) {
      counts[item] = (counts[item] || 0) + 1;
    }
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// Detecta o gênero aproximado pelo nome do artista
// (sem API externa — heurística simples para demo)
function guessGenres(artists: string[]): TopItem[] {
  // Mapeamento manual simplificado — substitua por Last.fm API depois
  const genreMap: Record<string, string> = {
    Radiohead: "Alternative",
    "The Beatles": "Rock",
    "Daft Punk": "Electronic",
    Beyoncé: "Pop",
    "Kendrick Lamar": "Hip-Hop",
    "Taylor Swift": "Pop",
    "Arctic Monkeys": "Indie Rock",
    "Frank Ocean": "R&B",
    "Tame Impala": "Psychedelic",
    "Mac Miller": "Hip-Hop",
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

// Processa os scrobbles brutos e gera os dados do Wrapped
export function processScrobbles(scrobbles: ScrobbleRaw[]): WrappedData {
  const artists = scrobbles.map((s) => s.artist).filter(Boolean);
  const albums = scrobbles.map((s) => s.album).filter(Boolean);
  const tracks = scrobbles.map((s) => s.track).filter(Boolean);

  // Descobre qual ano tem mais scrobbles (para o título do Wrapped)
  const years = scrobbles.map((s) => {
    const ts = parseInt(s.uts);
    return isNaN(ts) ? null : new Date(ts * 1000).getFullYear();
  }).filter(Boolean) as number[];

  const yearCounts: Record<number, number> = {};
  for (const y of years) {
    yearCounts[y] = (yearCounts[y] || 0) + 1;
  }
  const dominantYear = Object.entries(yearCounts)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || new Date().getFullYear().toString();

  // Escuta por hora do dia (0-23)
  const hourCounts = new Array(24).fill(0);
  for (const s of scrobbles) {
    const ts = parseInt(s.uts);
    if (!isNaN(ts)) {
      const hour = new Date(ts * 1000).getHours();
      hourCounts[hour]++;
    }
  }

  const topListeningHour = hourCounts.indexOf(Math.max(...hourCounts));

  return {
    year: dominantYear,
    totalScrobbles: scrobbles.length,
    topSongs: countItems(tracks).slice(0, 10),
    topArtists: countItems(artists).slice(0, 10),
    topAlbums: countItems(albums).slice(0, 10),
    topGenres: guessGenres(artists).slice(0, 8),
    hourlyDistribution: hourCounts.map((count, hour) => ({ hour, count })),
    topListeningHour,
  };
}