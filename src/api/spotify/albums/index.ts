import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  getAlbum(
    opts: SpotifyApi.GetAlbumParameterObject
  ): Promise<SpotifyApi.SingleAlbumResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${opts.id}?${query}`,
    };
    return request<SpotifyApi.SingleAlbumResponse>(req_options);
  },

  getAlbums(
    opts: SpotifyApi.GetAlbumsParameterObject
  ): Promise<SpotifyApi.MultipleAlbumsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/albums?${query}`,
    };
    return request<SpotifyApi.MultipleAlbumsResponse>(req_options);
  },

  getAlbumsTracks(
    opts: SpotifyApi.GetAlbumsTracksParameterObject
  ): Promise<SpotifyApi.AlbumTracksResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${opts.id}/tracks?${query}`,
    };
    return request<SpotifyApi.AlbumTracksResponse>(req_options);
  },

  getSavedAlbums(
    opts: SpotifyApi.GetSavedAlbumsParameterObject
  ): Promise<SpotifyApi.UsersSavedAlbumsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/albums?${query}`,
    };
    return request<SpotifyApi.UsersSavedAlbumsResponse>(req_options);
  },

  saveAlbums(
    opts: SpotifyApi.SaveAlbumsParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/albums",
      body: JSON.stringify(opts),
    };
    return request(req_options);
  },

  removeAlbums(
    opts: SpotifyApi.RemoveAlbumsParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: "/me/albums",
      body: JSON.stringify(opts),
    };
    return request(req_options);
  },

  checkSavedAlbums(
    opts: SpotifyApi.CheckSavedAlbumsParameterObject
  ): Promise<SpotifyApi.CheckUserSavedAlbumsResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/albums/contains?${query}`,
    };
    return request<SpotifyApi.CheckUserSavedAlbumsResponse>(req_options);
  },

  getNewReleases(
    opts: SpotifyApi.getNewReleasesParameterObject
  ): Promise<SpotifyApi.ListOfNewReleasesResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/browse/new-releases?${query}`,
    };
    return request<SpotifyApi.ListOfNewReleasesResponse>(req_options);
  },
};
