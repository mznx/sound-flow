import * as API from "@/types/API";

const serverURL = "https://api.spotify.com/v1";

const request = function (req_options: API.Request) {
  const link: string = serverURL + req_options.path;

  return fetch(link, {
    method: req_options.method,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
    body: req_options.body ? req_options.body : null,
  }).then((res) => {
    res.json().then(
      () => {
        return res.json();
      },
      () => {
        return null;
      }
    );
  });
};

export default request;
