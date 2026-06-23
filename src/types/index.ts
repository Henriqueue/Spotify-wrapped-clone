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
}

export interface HourlyItem {
  hour: number;
  count: number;
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
}

export type AppState = "idle" | "loading" | "ready" | "error";