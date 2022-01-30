import * as API from "@/types/API";

const serverURL = "https://api.spotify.com/v1";

const request = function <T>(req_options: API.Request): Promise<T | null> {
  const method: string = req_options.method;
  const link: string = serverURL + req_options.path;

  return fetch(link, {
    method: method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    body: req_options.body ? req_options.body : null,
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
