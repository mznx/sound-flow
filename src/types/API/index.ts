export interface Request {
  method: string;
  path: string;
  body?: string;
}

export type NullOrError = null | SpotifyApi.ErrorObject;
