import * as API from "@/types/API";
import * as APIAuth from "@/types/APIAuth";
import request from "../request";

export default {
  getUserAuthURL: function (): Promise<APIAuth.UserAuthURL> {
    const req_options: API.Request = {
      method: "GET",
      path: "/auth/login",
    };

    return request<APIAuth.UserAuthURL>(req_options);
  },

  checkToken: function (token: string): Promise<APIAuth.CheckToken> {
    const req_options: API.Request = {
      method: "GET",
      path: `/auth/check_token?access_token=${token}`,
    };

    return request<APIAuth.CheckToken>(req_options);
  },
};
