export interface PlayerState {
  player: Spotify.Player | null;
  device_id: string | null;
  playback_state: Spotify.PlaybackState | null;
}
