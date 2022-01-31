import * as API from "@/types/API";
import request from "../request";

export default {
  getArtist(
    id: string
  ): Promise<SpotifyApi.SingleArtistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${id}`,
    };
    return request<SpotifyApi.SingleArtistResponse>(req_options);
  },

  getArtists(
    ids: string
  ): Promise<SpotifyApi.MultipleArtistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists?ids=${ids}`,
    };
    return request<SpotifyApi.MultipleArtistsResponse>(req_options);
  },

  getArtistAlbums(
    id: string,
    include_groups?: string,
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyApi.ArtistsAlbumsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${id}/albums?include_groups=${include_groups}&limit=${limit}&offset=${offset}$market=${market}`,
    };
    return request<SpotifyApi.ArtistsAlbumsResponse>(req_options);
  },

  getArtistTopTracks(
    id: string,
    market?: string
  ): Promise<SpotifyApi.ArtistsTopTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${id}/top-tracks?market=${market}`,
    };
    return request<SpotifyApi.ArtistsTopTracksResponse>(req_options);
  },

  getArtistRelatedArtists(
    id: string
  ): Promise<SpotifyApi.ArtistsRelatedArtistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${id}/related-artists`,
    };
    return request<SpotifyApi.ArtistsRelatedArtistsResponse>(req_options);
  },
};
