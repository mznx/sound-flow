import * as API from "@/types/API";
import * as utils from "@/utils";
import request from "../request";

export default {
  search(
    opts: SpotifyApi.SearchForItemParameterObject
  ): Promise<SpotifyApi.SearchResponse | API.NullOrError> {
    const query = utils.paramObjToQueryStr(opts);
    const req_options: API.Request = {
      method: "GET",
      path: `/search?${query}`,
    };
    return request<SpotifyApi.SearchResponse>(req_options);
  },
};
