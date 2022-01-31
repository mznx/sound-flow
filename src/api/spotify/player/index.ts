import * as API from "@/types/API";
import request from "../request";

export default {
  getPlaybackState(): Promise<
    SpotifyApi.CurrentlyPlayingObject | API.NullOrError
  > {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player",
    };
    return request<SpotifyApi.CurrentlyPlayingObject>(req_options);
  },

  // в SpotifyApi нет типа для параметров, только TransferPlaybackParameterObject
  transferPlayback(device_id: string, play = false): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/player",
      body: JSON.stringify({ device_ids: [device_id], play: play }),
    };
    return request(req_options);
  },

  getAvailableDevices(): Promise<SpotifyApi.UserDevice | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player/devices",
    };
    return request<SpotifyApi.UserDevice>(req_options);
  },

  getCurrentTrack(): Promise<
    SpotifyApi.CurrentlyPlayingObject | API.NullOrError
  > {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player/currently-playing",
    };
    return request<SpotifyApi.CurrentlyPlayingObject>(req_options);
  },

  togglePlayback(
    opts: SpotifyApi.PlayParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/play?device_id=${opts.device_id}`,
      body: JSON.stringify(opts),
    };
    return request(req_options);
  },

  pausePlayback(device_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/pause?device_id=${device_id}`,
    };
    return request(req_options);
  },

  nextTrack(device_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/next?device_id=${device_id}`,
    };
    return request(req_options);
  },

  prevTrack(device_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/previous?device_id=${device_id}`,
    };
    return request(req_options);
  },

  seek(position_ms: number, device_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/seek?position_ms=${position_ms}&device_id=${device_id}`,
    };
    return request(req_options);
  },

  setRepeatMode(state: string, device_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/repeat?state=${state}&device_id=${device_id}`,
    };
    return request(req_options);
  },

  setVolume(
    volume_percent: number,
    device_id: string
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/volume?volume_percent=${volume_percent}&device_id=${device_id}`,
    };
    return request(req_options);
  },

  togglePlaybackShuffle(
    state: boolean,
    device_id: string
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/shuffle?state=${state}&device_id=${device_id}`,
    };
    return request(req_options);
  },

  getRecentlyPlayedTracks(
    opts: SpotifyApi.RecentlyPlayedParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/player/recently-played?after=${opts.after}&before=${opts.before}$limit=${opts.limit}`,
    };
    return request(req_options);
  },

  addToPlaybackQueue(uri: string, device_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/queue?uri=${uri}&device_id=${device_id}`,
    };
    return request(req_options);
  },
};
