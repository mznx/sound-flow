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
};
