export interface ScrobbleRaw {
  uts: string;
  utc_time: string;
  artist: string;
  artist_mbid: string;
  album: string;
  album_mbid: string;
  track: string;
  track_mbid: string;
}

export interface TopItem {
  name: string;
  count: number;
  artist?: string;
  mbid?: string;   // ← novo: MBID para busca direta no Cover Art Archive
  image?: string;
}

export interface HourlyItem {
  hour: number;
  count: number;
}

export interface MonthlyArtist {
  month: number;
  monthLabel: string;
  artist: string;
  count: number;
  image?: string;
}

export interface WrappedData {
  year: string;
  totalScrobbles: number;
  topSongs: TopItem[];
  topArtists: TopItem[];
  topAlbums: TopItem[];
  topGenres: TopItem[];
  hourlyDistribution: HourlyItem[];
  topListeningHour: number;
  monthlyArtists: MonthlyArtist[];
  availableYears: string[];   // ← novo: anos presentes no CSV
  artistImages?: Record<string, string>;
  albumImages?: Record<string, string>;
  songImages?: Record<string, string>;
}

export type AppState = "idle" | "loading" | "enriching" | "ready" | "error";
