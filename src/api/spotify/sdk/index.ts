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

  connect(player: Spotify.Player): Promise<Spotify.WebPlaybackInstance> {
    return new Promise((resolve) => {
      player.addListener(
        "ready",
        (playback_instance: Spotify.WebPlaybackInstance) => {
          // console.log('The Web Playback SDK is ready to play music!');
          resolve(playback_instance);
        }
      );

      player.connect().then((success: boolean) => {
        if (success) {
          // console.log("The Web Playback SDK successfully connected to Spotify!");
        }
      });
    });
  },

  disconnect(player: Spotify.Player): void {
    player.disconnect();
  },
};
