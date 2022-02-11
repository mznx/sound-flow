import * as API from "@/types/API";
import request from "../request";

export default {
  getAvailableGenreSeeds(): Promise<
    SpotifyApi.AvailableGenreSeedsResponse | API.NullOrError
  > {
    const req_options: API.Request = {
      method: "GET",
      path: `/recommendations/available-genre-seeds`,
    };
    return request<SpotifyApi.AvailableGenreSeedsResponse>(req_options);
  },
};
