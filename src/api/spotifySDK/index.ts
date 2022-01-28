/// <reference types="spotify-web-playback-sdk" />

const connect = function (token: string): Promise<Spotify.Player> {
  return new Promise((resolve) => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Sound Flow (Web Playback SDK)",
        getOAuthToken: (callback) => {
          callback(token);
        },
        volume: 0.5,
      });

      // Ready
      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      // Not Ready
      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();
      resolve(player);
    };
  });
};

export default {
  connect,
};
