export type AppStatus = "loaded" | "logged" | "not-login" | "error" | null;

export interface AppState {
  status: AppStatus;
}
