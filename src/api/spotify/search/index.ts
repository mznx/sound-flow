import * as API from "@/types/API";
import request from "../request";

export default {
  search(
    opts: SpotifyApi.SearchForItemParameterObject
  ): Promise<SpotifyApi.SearchResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/search?\
        q=${opts.q}\
        &type=${opts.type}\
        $include_external=${opts.include_external}\
        $limit=${opts.limit}\
        &offset=${opts.offset}\
        &market=${opts.market}\
      `,
    };
    return request<SpotifyApi.SearchResponse>(req_options);
  },
};
