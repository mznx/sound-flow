import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  getTrack(
    opts: SpotifyApi.GetTrackParameterObject
  ): Promise<SpotifyApi.SingleTrackResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/tracks/${opts.id}?${query}`,
    };
    return request<SpotifyApi.SingleTrackResponse>(req_options);
  },

  getTracks(
    opts: SpotifyApi.GetTracksParameterObject
  ): Promise<SpotifyApi.MultipleTracksResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/tracks?${query}`,
    };
    return request<SpotifyApi.MultipleTracksResponse>(req_options);
  },

  getSavedTracks(
    opts: SpotifyApi.GetSavedTracksParameterObject
  ): Promise<SpotifyApi.UsersSavedTracksResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/tracks?${query}`,
    };
    return request<SpotifyApi.UsersSavedTracksResponse>(req_options);
  },

  saveTracks(
    opts: SpotifyApi.SaveTracksParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/tracks",
      body: JSON.stringify(opts),
    };
    return request(req_options);
  },

  removeTracks(
    opts: SpotifyApi.RemoveTracksParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: "/me/tracks",
      body: JSON.stringify(opts),
    };
    return request(req_options);
  },

  checkSavedTracks(
    opts: SpotifyApi.CheckSavedTracksParameterObject
  ): Promise<SpotifyApi.CheckUsersSavedTracksResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/tracks/contains?${query}`,
    };
    return request<SpotifyApi.CheckUsersSavedTracksResponse>(req_options);
  },

  getTracksAudioFeatures(
    opts: SpotifyApi.GetTracksAudioFeaturesParameterObject
  ): Promise<SpotifyApi.MultipleAudioFeaturesResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/audio-features?${query}`,
    };
    return request<SpotifyApi.MultipleAudioFeaturesResponse>(req_options);
  },

  getTrackAudioFeatures(
    opts: SpotifyApi.GetTrackAudioFeaturesParameterObject
  ): Promise<SpotifyApi.AudioFeaturesResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/audio-features/${opts.id}`,
    };
    return request<SpotifyApi.AudioFeaturesResponse>(req_options);
  },

  getTrackAudioAnalysis(
    opts: SpotifyApi.GetTrackAudioAnalysisParameterObject
  ): Promise<SpotifyApi.AudioAnalysisResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/audio-analysis/${opts.id}`,
    };
    return request<SpotifyApi.AudioAnalysisResponse>(req_options);
  },

  getRecommendations(
    opts: SpotifyApi.RecommendationsOptionsObject
  ): Promise<SpotifyApi.RecommendationsFromSeedsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/recommendations?${query}`,
    };
    return request<SpotifyApi.RecommendationsFromSeedsResponse>(req_options);
  },
};
