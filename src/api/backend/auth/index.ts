import * as API from "@/types/API";
import request from "../request";

export default {
  getUserAuthURL: function (): Promise<API.UserAuthURL> {
    const req_options: API.Request = {
      method: "GET",
      path: "/auth/login",
    };

    return request<API.UserAuthURL>(req_options);
  },

  checkToken: function (token: string): Promise<API.CheckToken> {
    const req_options: API.Request = {
      method: "GET",
      path: `/auth/check_token?access_token=${token}`,
    };

    return request<API.CheckToken>(req_options);
  },

  refreshToken: function (refresh_token: string): Promise<API.RefreshToken> {
    const req_options: API.Request = {
      method: "GET",
      path: `/auth/refresh_token?refresh_token=${refresh_token}`,
    };

    return request<API.RefreshToken>(req_options);
  },
};
