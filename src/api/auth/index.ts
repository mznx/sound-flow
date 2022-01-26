const serverURL: string =
  process.env.NODE_ENV === "production"
    ? "https://185.46.10.57:7000"
    : "https://localhost:7000";

const request = function (addr: string, method: string): Promise<JSON> {
  const link: string = serverURL + addr;

  return fetch(link, { method: method }).then((res) => {
    return res.json();
  });
};

export default {
  getUserAuthURL: function (): Promise<JSON> {
    const addr = "/login";
    const method = "GET";
    return request(addr, method);
  },

  checkToken: function (token: string): Promise<JSON> {
    const addr = `/check_token?token=${token}`;
    const method = "GET";
    return request(addr, method);
  },
};
