import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  getPlaybackState(
    opts: SpotifyApi.GetPlaybackStateParameterObject
  ): Promise<SpotifyApi.CurrentlyPlayingObject | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/player?${query}`,
    };
    return request<SpotifyApi.CurrentlyPlayingObject>(req_options);
  },

  transferPlayback(
    opts: SpotifyApi.TransferPlaybackParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/player",
      body: JSON.stringify(opts),
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

  getCurrentTrack(
    opts: SpotifyApi.GetCurrentTrackParameterObject
  ): Promise<SpotifyApi.CurrentlyPlayingObject | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/player/currently-playing?${query}`,
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

  pausePlayback(
    opts: SpotifyApi.PausePlaybackParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/pause?device_id=${opts.device_id}`,
    };
    return request(req_options);
  },

  nextTrack(
    opts: SpotifyApi.NextTrackParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/next?device_id=${opts.device_id}`,
    };
    return request(req_options);
  },

  prevTrack(
    opts: SpotifyApi.PrevTrackParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/previous?device_id=${opts.device_id}`,
    };
    return request(req_options);
  },

  seek(
    opts: SpotifyApi.SeekToPositionParameterObject
  ): Promise<API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/seek?${query}`,
    };
    return request(req_options);
  },

  setRepeatMode(
    opts: SpotifyApi.SetRepeatModeParameterObject
  ): Promise<API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/repeat?${query}`,
    };
    return request(req_options);
  },

  setVolume(
    opts: SpotifyApi.SetVolumeParameterObject
  ): Promise<API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/volume?${query}`,
    };
    return request(req_options);
  },

  togglePlaybackShuffle(
    opts: SpotifyApi.TogglePlaybackShuffleParameterObject
  ): Promise<API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/player/shuffle?${query}`,
    };
    return request(req_options);
  },

  getRecentlyPlayedTracks(
    opts: SpotifyApi.RecentlyPlayedParameterObject
  ): Promise<API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/player/recently-played?${query}`,
    };
    return request(req_options);
  },

  addToPlaybackQueue(
    opts: SpotifyApi.AddToPlaybackQueueParameterObject
  ): Promise<API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "POST",
      path: `/me/player/queue?${query}`,
    };
    return request(req_options);
  },
};
