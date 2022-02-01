import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  getPlaylist(
    opts: SpotifyApi.GetPlaylistParameterObject
  ): Promise<SpotifyApi.SinglePlaylistResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${opts.playlist_id}?${query}`,
    };
    return request<SpotifyApi.SinglePlaylistResponse>(req_options);
  },

  changePlaylistDetails(
    opts: SpotifyApi.ChangePlaylistDetailsParameterObject
  ): Promise<SpotifyApi.ChangePlaylistDetailsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${opts.playlist_id}`,
      body: JSON.stringify(opts),
    };
    return request<SpotifyApi.ChangePlaylistDetailsResponse>(req_options);
  },

  getPlaylistTracks(
    opts: SpotifyApi.GetPlaylistTracksParameterObject
  ): Promise<SpotifyApi.PlaylistTrackResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${opts.playlist_id}/tracks?${query}`,
    };
    return request<SpotifyApi.PlaylistTrackResponse>(req_options);
  },

  addTracksToPlaylist(
    opts: SpotifyApi.AddTracksToPlaylistParameterObject
  ): Promise<SpotifyApi.AddTracksToPlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/playlists/${opts.playlist_id}/tracks`,
      body: JSON.stringify(opts),
    };
    return request<SpotifyApi.AddTracksToPlaylistResponse>(req_options);
  },

  reorderPlaylistTracks(
    opts: SpotifyApi.ReorderPlaylistTracksParameterObject
  ): Promise<SpotifyApi.ReorderPlaylistTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${opts.playlist_id}/tracks`,
      body: JSON.stringify(opts),
    };
    return request<SpotifyApi.ReorderPlaylistTracksResponse>(req_options);
  },

  replacePlaylistTracks(
    opts: SpotifyApi.ReplacePlaylistTracksParameterObject
  ): Promise<SpotifyApi.ReplacePlaylistTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${opts.playlist_id}/tracks`,
      body: JSON.stringify(opts),
    };
    return request<SpotifyApi.ReplacePlaylistTracksResponse>(req_options);
  },

  removePlaylistTracks(
    opts: SpotifyApi.RemovePlaylistTracksParameterObject
  ): Promise<SpotifyApi.RemoveTracksFromPlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: `/playlists/${opts.playlist_id}/tracks`,
      body: JSON.stringify(opts),
    };
    return request<SpotifyApi.RemoveTracksFromPlaylistResponse>(req_options);
  },

  getCurrentUserPlaylists(
    opts: SpotifyApi.GetCurrentUserPlaylistsParameterObject
  ): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/playlists?${query}`,
    };
    return request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(req_options);
  },

  getUserPlaylists(
    opts: SpotifyApi.GetUserPlaylistsParameterObject
  ): Promise<SpotifyApi.ListOfUsersPlaylistsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/users/${opts.user_id}/playlists?${query}`,
    };
    return request<SpotifyApi.ListOfUsersPlaylistsResponse>(req_options);
  },

  createPlaylist(
    opts: SpotifyApi.CreatePlaylistParameterObject
  ): Promise<SpotifyApi.CreatePlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/users/${opts.user_id}/playlists`,
      body: JSON.stringify(opts),
    };
    return request<SpotifyApi.CreatePlaylistResponse>(req_options);
  },

  getFeaturedPlaylists(
    opts: SpotifyApi.GetFeaturedPlaylistsParameterObject
  ): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/browse/featured-playlists?${query}`,
    };
    return request<SpotifyApi.ListOfFeaturedPlaylistsResponse>(req_options);
  },

  getCategorysPlaylists(
    opts: SpotifyApi.GetCategorysPlaylistsParameterObject
  ): Promise<SpotifyApi.CategoryPlaylistsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/browse/categories/${opts.category_id}/playlists?${query}`,
    };
    return request<SpotifyApi.CategoryPlaylistsResponse>(req_options);
  },

  getPlaylistImage(
    opts: SpotifyApi.GetPlaylistImageParameterObject
  ): Promise<SpotifyApi.ImageObject[] | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${opts.playlist_id}/images`,
    };
    return request<SpotifyApi.ImageObject[]>(req_options);
  },

  setPlaylistImage(
    opts: SpotifyApi.SetPlaylistImageParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${opts.playlist_id}/images`,
    };
    return request(req_options);
  },
};
