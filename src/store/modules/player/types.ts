export interface PlayerState {
  player: Spotify.Player | null;
  device_id: string | null;
  playback: SpotifyApi.CurrentlyPlayingObject | null;
  playback_state: Spotify.PlaybackState | null;
}
