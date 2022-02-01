declare namespace SpotifyApi {
  // albums
  interface GetAlbumParameterObject {
    id: string;
    market?: string;
  }

  interface GetAlbumsParameterObject {
    ids: string;
    market?: string;
  }

  interface GetAlbumsTracksParameterObject {
    id: string;
    limit?: number;
    offset?: number;
    market?: string;
  }

  interface GetSavedAlbumsParameterObject {
    limit?: number;
    offset?: number;
    market?: string;
  }

  interface SaveAlbumsParameterObject {
    ids: string[];
  }

  interface RemoveAlbumsParameterObject {
    ids: string[];
  }

  interface CheckSavedAlbumsParameterObject {
    ids: string;
  }

  interface getNewReleasesParameterObject {
    limit?: number;
    offset?: number;
    country?: string;
  }

  // playlists
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

  // player
  interface GetPlaybackStateParameterObject {
    market?: string;
  }

  interface TransferPlaybackParameterObject {
    device_ids: string[];
    play?: boolean;
  }

  interface GetCurrentTrackParameterObject {
    market?: string;
  }

  interface PausePlaybackParameterObject {
    device_id?: string;
  }

  interface NextTrackParameterObject {
    device_id?: string;
  }

  interface PrevTrackParameterObject {
    device_id?: string;
  }

  interface SeekToPositionParameterObject {
    position_ms: number;
    device_id?: string;
  }

  interface SetRepeatModeParameterObject {
    state: string;
    device_id?: string;
  }

  interface SetVolumeParameterObject {
    volume_percent: number;
    device_id?: strin;
  }

  interface TogglePlaybackShuffleParameterObject {
    state: boolean;
    device_id?: string;
  }

  interface AddToPlaybackQueueParameterObject {
    uri: string;
    device_id?: string;
  }
}
