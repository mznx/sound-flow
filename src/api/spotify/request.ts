import * as API from "@/types/API";

const serverURL = "https://api.spotify.com/v1";

const request = function <T>(opts: API.Request): Promise<T | API.NullOrError> {
  const method: string = opts.method;
  const link: string = serverURL + opts.path;

  return fetch(link, {
    method: method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    body: opts.body ? opts.body : null,
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch(() => {
      return null;
    });
};

export default request;
