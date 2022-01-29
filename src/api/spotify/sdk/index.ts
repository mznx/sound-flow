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

      player.connect().then((success) => {
        resolve(player);
      });
    };
  });
};

const transferPlayback = function () {
  const token = localStorage.getItem("access_token");

  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    body: JSON.stringify({ device_ids: ["token"] }),
  }).then((res) => {
    return res.json();
  });
};

export default {
  connect,
  transferPlayback,
};
