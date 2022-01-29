import * as APIAuth from "@/types/APIAuth";

const serverURL: string =
  process.env.NODE_ENV === "production"
    ? "https://api-sf.mznx.xyz"
    : "https://localhost:7000";

const request = function (
  method: string,
  addr: string
): Promise<APIAuth.JSONResponse> {
  const link: string = serverURL + addr;

  return fetch(link, { method: method }).then((res) => {
    return res.json();
  });
};

export default request;
