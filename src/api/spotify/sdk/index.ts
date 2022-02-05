export default {
  init(access_token: string): Promise<Spotify.Player> {
    return new Promise((resolve) => {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: "Sound Flow (Web Playback SDK)",
          getOAuthToken: (callback) => {
            callback(access_token);
          },
          volume: 0.5,
        });

        resolve(player);
      };
    });
  },

  connect(player: Spotify.Player): Promise<boolean> {
    return new Promise((resolve) => {
      player.connect().then((success: boolean) => {
        if (success) {
          console.log(
            "The Web Playback SDK successfully connected to Spotify!"
          );
          resolve(true);
        }
      });
    });
  },

  disconnect(player: Spotify.Player): void {
    player.disconnect();
  },

  togglePlay(player: Spotify.Player): Promise<void> {
    return player.togglePlay();
  },

  previousTrack(player: Spotify.Player): Promise<void> {
    return player.previousTrack();
  },

  nextTrack(player: Spotify.Player): Promise<void> {
    return player.nextTrack();
  },

  seek(player: Spotify.Player, ms: number): Promise<void> {
    return player.seek(ms);
  },

  getVolume(player: Spotify.Player): Promise<number> {
    return player.getVolume();
  },

  setVolume(player: Spotify.Player, volume: number): Promise<void> {
    return player.setVolume(volume);
  },
};
