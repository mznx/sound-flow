export interface UserAuthURL extends JSON {
  link: string;
  state_key: string;
  state: string;
}

export interface CheckToken extends JSON {
  status: string;
}

export interface JSONResponse extends UserAuthURL, CheckToken {}