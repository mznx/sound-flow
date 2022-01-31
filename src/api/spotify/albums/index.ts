import * as API from "@/types/API";
import request from "../request";

export default {
  getAlbum(
    id: string
  ): Promise<SpotifyApi.SingleAlbumResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${id}`,
    };
    return request<SpotifyApi.SingleAlbumResponse>(req_options);
  },

  getAlbums(
    ids: string,
    market: string
  ): Promise<SpotifyApi.MultipleAlbumsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums?ids=${ids}&market=${market}`,
    };
    return request<SpotifyApi.MultipleAlbumsResponse>(req_options);
  },

  getAlbumsTracks(
    id: string,
    market: string,
    limit = 50,
    offset = 0
  ): Promise<SpotifyApi.AlbumTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${id}/tracks?market=${market}&limit=${limit}&offset=${offset}`,
    };
    return request<SpotifyApi.AlbumTracksResponse>(req_options);
  },
};
