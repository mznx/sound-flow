import * as API from "@/types/API";
import request from "../request";

export default {
  // добавить тип PlaybackState
  getPlaybackState(): Promise<null> {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player",
    };
    return request(req_options);
  },

  // добавить тип AvaliableDevice
  getAvailableDevices(): Promise<null> {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player/devices",
    };
    return request(req_options);
  },

  transferPlayback(device_id: string): Promise<null | SpotifyApi.ErrorObject> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/player",
      body: JSON.stringify({ device_ids: [device_id] }),
    };
    return request(req_options);
  },

  togglePlaybackShuffle(
    shuffle_state: boolean,
    device_id: string
  ): Promise<null | SpotifyApi.ErrorObject> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/shuffle?state=${shuffle_state}&device_id=${device_id}`,
    };
    return request(req_options);
  },

  toggleRepeatMode(
    repeat_mode: string,
    device_id: string
  ): Promise<null | SpotifyApi.ErrorObject> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/repeat?state=${repeat_mode}&device_id=${device_id}`,
    };
    return request(req_options);
  },
};
