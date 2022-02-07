import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  getArtist(
    opts: SpotifyApi.GetArtistParameterObject
  ): Promise<SpotifyApi.SingleArtistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${opts.params.id}`,
    };
    return request<SpotifyApi.SingleArtistResponse>(req_options);
  },

  getArtists(
    opts: SpotifyApi.GetArtistsParameterObject
  ): Promise<SpotifyApi.MultipleArtistsResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/artists?${query}`,
    };
    return request<SpotifyApi.MultipleArtistsResponse>(req_options);
  },

  getArtisAlbums(
    opts: SpotifyApi.GetArtistAlbumsParameterObject
  ): Promise<SpotifyApi.ArtistsAlbumsResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${opts.params.id}/albums?${query}`,
    };
    return request<SpotifyApi.ArtistsAlbumsResponse>(req_options);
  },

  getArtisTopTracks(
    opts: SpotifyApi.GetArtistTopTracksParameterObject
  ): Promise<SpotifyApi.ArtistsTopTracksResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${opts.params.id}/top-tracks?${query}`,
    };
    return request<SpotifyApi.ArtistsTopTracksResponse>(req_options);
  },

  getArtistRelatedArtists(
    opts: SpotifyApi.GetArtistRelatedArtistsParameterObject
  ): Promise<SpotifyApi.ArtistsRelatedArtistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/artists/${opts.params.id}/related-artists`,
    };
    return request<SpotifyApi.ArtistsRelatedArtistsResponse>(req_options);
  },
};
