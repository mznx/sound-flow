import * as API from "@/types/API";
import request from "../request";

export default {
  getAlbum(id: string) {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${id}`,
    };
    return request(req_options);
  },

  getAlbums(ids: string, market: string) {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums?ids=${ids}&market=${market}`,
    };
    return request(req_options);
  },

  getAlbumsTracks(id: string, market: string, limit = 50, offset = 0) {
    const req_options: API.Request = {
      method: "GET",
      path: `/albums/${id}/tracks?market=${market}&limit=${limit}&offset=${offset}`,
    };
    return request(req_options);
  },
};
