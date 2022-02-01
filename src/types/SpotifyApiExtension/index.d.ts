declare namespace SpotifyApi {
  interface GetPlaylistParameterObject {
    playlist_id: string;
    fields?: string;
    market?: string;
  }

  interface ChangePlaylistDetailsParameterObject {
    playlist_id: string;
    name?: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  }

  interface GetPlaylistTracksParameterObject {
    playlist_id: string;
    fields?: string;
    limit?: number;
    offset?: number;
    market?: string;
  }

  interface AddTracksToPlaylistParameterObject {
    playlist_id: string;
    position?: number;
    uris?: string[];
  }

  interface ReorderPlaylistTracksParameterObject {
    playlist_id: string;
    range_start?: number;
    insert_before?: number;
    range_length?: number;
    snapshot_id?: string;
  }

  interface ReplacePlaylistTracksParameterObject {
    playlist_id: string;
    uris?: string[];
  }

  interface RemovePlaylistTracksParameterObject {
    playlist_id: string;
    tracks: SpotifyApi.TrackLinkObject[];
    snapshot_id?: string;
  }

  interface GetCurrentUserPlaylistsParameterObject {
    limit?: number;
    offset?: number;
  }

  interface GetUserPlaylistsParameterObject
    extends GetCurrentUserPlaylistsParameterObject {
    user_id: string;
  }

  interface CreatePlaylistParameterObject {
    user_id: string;
    name: string;
    public?: boolean;
    collaborative?: boolean;
    description?: string;
  }

  interface GetFeaturedPlaylistsParameterObject {
    country?: string;
    locale?: string;
    timestamp?: string;
    limit?: number;
    offset?: number;
  }

  interface GetCategorysPlaylistsParameterObject {
    category_id: string;
    country?: string;
    limit?: number;
    offset?: number;
  }

  interface GetPlaylistImageParameterObject {
    playlist_id: string;
  }

  interface SetPlaylistImageParameterObject {
    playlist_id: string;
  }
}
