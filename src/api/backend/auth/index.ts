import * as APIAuth from "@/types/APIAuth";
import request from "../request";

export default {
  getUserAuthURL: function (): Promise<APIAuth.UserAuthURL> {
    const addr = "/auth/login";
    const method = "GET";
    return request(method, addr);
  },

  checkToken: function (token: string): Promise<APIAuth.CheckToken> {
    const addr = `/auth/check_token?access_token=${token}`;
    const method = "GET";
    return request(method, addr);
  },
};
