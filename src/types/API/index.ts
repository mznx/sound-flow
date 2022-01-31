export interface Request {
  method: string;
  path: string;
  body?: string;
}

export type NullOrError = null | SpotifyApi.ErrorObject;

export interface UserAuthURL {
  link: string;
  state_key: string;
  state: string;
}

export interface CheckToken {
  status: string;
}
