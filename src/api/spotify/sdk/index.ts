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

  togglePlay(player: Spotify.Player): void {
    player.togglePlay();
  },

  previousTrack(player: Spotify.Player): void {
    player.previousTrack();
  },

  nextTrack(player: Spotify.Player): void {
    player.nextTrack();
  },
};
