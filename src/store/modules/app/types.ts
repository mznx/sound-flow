export type AppStatus = "loaded" | "logged" | "not-logged" | "not-found" | "error" | null;

export interface AppState {
  status: AppStatus;
}
