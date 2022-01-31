import * as API from "@/types/API";
import request from "../request";

export default {
  getTrack(
    id: string,
    market?: string
  ): Promise<SpotifyApi.SingleTrackResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/tracks/${id}?market=${market}`,
    };
    return request<SpotifyApi.SingleTrackResponse>(req_options);
  },

  getTracks(
    ids: string,
    market?: string
  ): Promise<SpotifyApi.MultipleTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/tracks?ids=${ids}&market=${market}`,
    };
    return request<SpotifyApi.MultipleTracksResponse>(req_options);
  },

  getSavedTracks(
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyApi.UsersSavedTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/tracks?limit=${limit}&offset=${offset}&market=${market}`,
    };
    return request<SpotifyApi.UsersSavedTracksResponse>(req_options);
  },

  saveTracks(ids: string[]): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/tracks",
      body: JSON.stringify({ ids }),
    };
    return request(req_options);
  },

  removeTracks(ids: string[]): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: "/me/tracks",
      body: JSON.stringify({ ids }),
    };
    return request(req_options);
  },

  checkSavedTracks(
    ids: string
  ): Promise<SpotifyApi.CheckUsersSavedTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/tracks/contains?ids=${ids}`,
    };
    return request<SpotifyApi.CheckUsersSavedTracksResponse>(req_options);
  },

  getTracksAudioFeatures(
    ids: string
  ): Promise<SpotifyApi.MultipleAudioFeaturesResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/audio-features?ids=${ids}`,
    };
    return request<SpotifyApi.MultipleAudioFeaturesResponse>(req_options);
  },

  getTrackAudioFeatures(
    id: string
  ): Promise<SpotifyApi.AudioFeaturesResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/audio-features/${id}`,
    };
    return request<SpotifyApi.AudioFeaturesResponse>(req_options);
  },

  getTrackAudioAnalysis(
    id: string
  ): Promise<SpotifyApi.AudioAnalysisResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/audio-analysis/${id}`,
    };
    return request<SpotifyApi.AudioAnalysisResponse>(req_options);
  },

  // разобрать
  getRecommendations(
    opts: SpotifyApi.RecommendationsOptionsObject
  ): Promise<SpotifyApi.RecommendationsFromSeedsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/recommendations?\
        limit=${opts.limit}&\
        market=${opts.market}&\
        max_acousticness=${opts.max_acousticness}&\
        max_danceability=${opts.max_danceability}&\
        max_duration_ms=${opts.max_duration_ms}&\
        max_energy=${opts.max_energy}&\
        max_instrumentalness=${opts.max_instrumentalness}&\
        max_key=${opts.max_key}&\
        max_liveness=${opts.max_liveness}&\
        max_loudness=${opts.max_loudness}&\
        max_mode=${opts.max_mode}&\
        max_popularity=${opts.max_popularity}&\
        max_speechiness=${opts.max_speechiness}&\
        max_tempo=${opts.max_tempo}&\
        max_time_signature=${opts.max_time_signature}&\
        max_valence=${opts.max_valence}&\
        min_acousticness=${opts.min_acousticness}&\
        min_danceability=${opts.min_danceability}&\
        min_duration_ms=${opts.min_duration_ms}&\
        min_energy=${opts.min_energy}&\
        min_instrumentalness=${opts.min_instrumentalness}&\
        min_key=${opts.min_key}&\
        min_liveness=${opts.min_liveness}&\
        min_loudness=${opts.min_loudness}&\
        min_mode=${opts.min_mode}&\
        min_popularity=${opts.min_popularity}&\
        min_speechiness=${opts.min_speechiness}&\
        min_tempo=${opts.min_tempo}&\
        min_time_signature=${opts.min_time_signature}&\
        min_valence=${opts.min_valence}&\
        seed_artists=${opts.seed_artists}&\
        seed_genres=${opts.seed_genres}&\
        seed_tracks=${opts.seed_tracks}&\
        target_acousticness=${opts.target_acousticness}&\
        target_danceability=${opts.target_danceability}&\
        target_duration_ms=${opts.target_duration_ms}&\
        target_energy=${opts.target_energy}&\
        target_instrumentalness=${opts.target_instrumentalness}&\
        target_key=${opts.target_key}&\
        target_liveness=${opts.target_liveness}&\
        target_loudness=${opts.target_loudness}&\
        target_mode=${opts.target_mode}&\
        target_popularity=${opts.target_popularity}&\
        target_speechiness=${opts.target_speechiness}&\
        target_tempo=${opts.target_tempo}&\
        target_time_signature=${opts.target_time_signature}&\
        target_valence=${opts.target_valence}\
      `,
    };
    return request<SpotifyApi.RecommendationsFromSeedsResponse>(req_options);
  },
};
