import * as API from "@/types/API";

const serverURL: string =
  process.env.NODE_ENV === "production"
    ? "https://api-sf.mznx.xyz"
    : "https://localhost:7000";

const request = function <T>(req_options: API.Request): Promise<T> {
  const method: string = req_options.method;
  const link: string = serverURL + req_options.path;

  return fetch(link, { method: method }).then((res) => {
    return res.json();
  });
};

export default request;
