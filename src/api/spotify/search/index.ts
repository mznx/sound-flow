import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  search(
    opts: SpotifyApi.SearchParameterObject
  ): Promise<SpotifyApi.SearchResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/search?${query}`,
    };
    return request<SpotifyApi.SearchResponse>(req_options);
  },
};
