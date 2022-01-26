import * as APIAuth from "@/types/APIAuth";

const serverURL: string =
  process.env.NODE_ENV === "production"
    ? "https://185.46.10.57:7000"
    : "https://localhost:7000";

const request = function (
  addr: string,
  method: string
): Promise<APIAuth.JSONResponse> {
  const link: string = serverURL + addr;

  return fetch(link, { method: method }).then((res) => {
    return res.json();
  });
};

export default {
  getUserAuthURL: function (): Promise<APIAuth.UserAuthURL> {
    const addr = "/login";
    const method = "GET";
    return request(addr, method);
  },

  checkToken: function (token: string): Promise<APIAuth.CheckToken> {
    const addr = `/check_token?access_token=${token}`;
    const method = "GET";
    return request(addr, method);
  },
};
