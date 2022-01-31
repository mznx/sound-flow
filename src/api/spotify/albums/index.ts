import * as API from "@/types/API";
import request from "../request";

export default {
  getAlbum(
    id: string,
    market?: string
  ): Promise<SpotifyApi.SingleAlbumResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${id}?market=${market}`,
    };
    return request<SpotifyApi.SingleAlbumResponse>(req_options);
  },

  getAlbums(
    ids: string,
    market?: string
  ): Promise<SpotifyApi.MultipleAlbumsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums?ids=${ids}&market=${market}`,
    };
    return request<SpotifyApi.MultipleAlbumsResponse>(req_options);
  },

  getAlbumsTracks(
    id: string,
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyApi.AlbumTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${id}/tracks?limit=${limit}&offset=${offset}&market=${market}`,
    };
    return request<SpotifyApi.AlbumTracksResponse>(req_options);
  },

  getSavedAlbums(
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyApi.UsersSavedAlbumsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/albums?limit=${limit}&offset=${offset}&market=${market}`,
    };
    return request<SpotifyApi.UsersSavedAlbumsResponse>(req_options);
  },

  saveAlbums(ids: string[]): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/albums",
      body: JSON.stringify({ ids: ids }),
    };
    return request(req_options);
  },

  removeAlbums(ids: string[]): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: "/me/albums",
      body: JSON.stringify({ ids: ids }),
    };
    return request(req_options);
  },

  checkSavedAlbums(
    ids: string
  ): Promise<SpotifyApi.CheckUserSavedAlbumsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/albums/contains?ids=${ids}`,
    };
    return request<SpotifyApi.CheckUserSavedAlbumsResponse>(req_options);
  },

  getNewReleases(
    limit?: number,
    offset?: number,
    country?: string
  ): Promise<SpotifyApi.ListOfNewReleasesResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/browse/new-releases?limit=${limit}&offset=${offset}&country=${country}`,
    };
    return request<SpotifyApi.ListOfNewReleasesResponse>(req_options);
  },
};
