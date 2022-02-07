declare namespace SpotifyApi {
  // albums
  interface GetAlbumParameterObject {
    params: {
      id: string;
    };
    query?: {
      market?: string;
    };
  }

  interface GetAlbumsParameterObject {
    query: {
      ids: string;
      market?: string;
    };
  }

  interface GetAlbumsTracksParameterObject {
    params: {
      id: string;
    };
    query?: {
      limit?: number;
      offset?: number;
      market?: string;
    };
  }

  interface GetSavedAlbumsParameterObject {
    query?: {
      limit?: number;
      offset?: number;
      market?: string;
    };
  }

  interface SaveAlbumsParameterObject {
    body: {
      ids: string[];
    };
  }

  interface RemoveAlbumsParameterObject {
    body: {
      ids: string[];
    };
  }

  interface CheckSavedAlbumsParameterObject {
    query: {
      ids: string;
    };
  }

  interface getNewReleasesParameterObject {
    query?: {
      country?: string;
      limit?: number;
      offset?: number;
    };
  }

  // artists
  interface GetArtistParameterObject {
    params: {
      id: string;
    };
  }

  interface GetArtistsParameterObject {
    query: {
      ids: string;
    };
  }

  interface GetArtistAlbumsParameterObject {
    params: {
      id: string;
    };
    query?: {
      include_groups?: string;
      limit?: number;
      market?: string;
      offset?: number;
    };
  }

  interface GetArtistTopTracksParameterObject {
    params: {
      id: string;
    };
    query?: {
      market?: string;
    };
  }

  interface GetArtistRelatedArtistsParameterObject {
    params: {
      id: string;
    };
  }

  // tracks
  interface GetTrackParameterObject {
    params: {
      id: string;
    };
    query?: {
      market?: string;
    };
  }

  interface GetTracksParameterObject {
    query: {
      ids: string;
      market?: string;
    };
  }

  interface GetSavedTracksParameterObject {
    query?: {
      limit?: number;
      market?: string;
      offset?: number;
    };
  }

  interface SaveTracksParameterObject {
    body: {
      ids: string[];
    };
  }

  interface RemoveTracksParameterObject {
    body: {
      ids: string[];
    };
  }

  interface CheckSavedTracksParameterObject {
    query: {
      ids: string[];
    };
  }

  interface GetTracksAudioFeaturesParameterObject {
    query: {
      ids: string[];
    };
  }

  interface GetTrackAudioFeaturesParameterObject {
    params: {
      id: string;
    };
  }

  interface GetTrackAudioAnalysisParameterObject {
    params: {
      id: string;
    };
  }

  interface GetRecommendationsParameterObject {
    query: RecommendationsOptionsObject;
  }

  // search
  interface SearchParameterObject {
    query: SearchForItemParameterObject;
  }

  // users
  interface GetUserTopArtistsParameterObject {
    query?: {
      limit?: number;
      offset?: number;
      time_range?: string;
    };
  }

  interface GetUserTopTracksParameterObject {
    query?: {
      limit?: number;
      offset?: number;
      time_range?: string;
    };
  }

  interface GetUserProfileParameterObject {
    params: {
      user_id: string;
    };
  }

  interface FollowPlaylistParameterObject {
    params: {
      playlist_id: string;
    };
    body?: {
      public?: boolean;
    };
  }

  interface UnfollowPlaylistParameterObject {
    params: {
      playlist_id: string;
    };
  }

  interface GetFollowedArtistsParameterObject {
    query: {
      type: string;
      limit?: number;
      after?: string;
    };
  }

  interface FollowArtistsOrUsersParameterObject {
    query: {
      type: string;
    };
    body: {
      ids: string[];
    };
  }

  interface UnfollowArtistsOrUsersParameterObject {
    query: {
      type: string;
    };
    body: {
      ids: string[];
    };
  }

  interface CheckUserFollowArtistsOrUsersParameterObject {
    query: {
      ids: string;
      type: string;
    };
  }

  interface CheckUsersFollowPlaylistParameterObject {
    params: {
      playlist_id: string;
    };
    query: {
      ids: string;
    };
  }

  // playlists
  interface GetPlaylistParameterObject {
    params: {
      playlist_id: string;
    };
    query?: {
      fields?: string;
      market?: string;
    };
  }

  interface ChangePlaylistDetailsParameterObject {
    params: {
      playlist_id: string;
    };
    body?: {
      name?: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    };
  }

  interface GetPlaylistTracksParameterObject {
    params: {
      playlist_id: string;
    };
    query?: {
      fields?: string;
      limit?: number;
      market?: string;
      offset?: number;
    };
  }

  interface AddTracksToPlaylistParameterObject {
    params: {
      playlist_id: string;
    };
    body?: {
      uris?: string[];
      position?: number;
    };
  }

  interface ReorderPlaylistTracksParameterObject {
    params: {
      playlist_id: string;
    };
    body?: {
      range_start?: number;
      insert_before?: number;
      range_length?: number;
      snapshot_id?: string;
    };
  }

  interface ReplacePlaylistTracksParameterObject {
    params: {
      playlist_id: string;
    };
    body?: {
      uris?: string[];
    };
  }

  interface SpotifyUri {
    uri: string;
  }

  interface RemovePlaylistTracksParameterObject {
    params: {
      playlist_id: string;
    };
    body: {
      tracks: SpotifyUri[];
      snapshot_id?: string;
    };
  }

  interface GetCurrentUserPlaylistsParameterObject {
    query?: {
      limit?: number;
      offset?: number;
    };
  }

  interface GetUserPlaylistsParameterObject {
    params: {
      user_id: string;
    };
    query?: {
      limit?: number;
      offset?: number;
    };
  }

  interface CreatePlaylistParameterObject {
    params: {
      user_id: string;
    };
    body: {
      name: string;
      public?: boolean;
      collaborative?: boolean;
      description?: string;
    };
  }

  interface GetFeaturedPlaylistsParameterObject {
    query?: {
      country?: string;
      limit?: number;
      locale?: string;
      offset?: number;
      timestamp?: string;
    };
  }

  interface GetCategoryPlaylistsParameterObject {
    params: {
      category_id: string;
    };
    query?: {
      country?: string;
      limit?: number;
      offset?: number;
    };
  }

  interface GetPlaylistImageParameterObject {
    params: {
      playlist_id: string;
    };
  }

  interface SetPlaylistImageParameterObject {
    params: {
      playlist_id: string;
    };
  }

  // player
  interface GetPlaybackStateParameterObject {
    query?: {
      market?: string;
    };
  }

  interface TransferPlaybackParameterObject {
    body: {
      device_ids: string[];
      play?: boolean;
    };
  }

  interface GetCurrentTrackParameterObject {
    query?: {
      market?: string;
    };
  }

  interface StartPlaybackParameterObject {
    query?: {
      device_id?: string;
    };
    body?: {
      context_uri?: string;
      uris?: string[];
      offset?: { position: number };
      position_ms?: number;
    };
  }

  interface PausePlaybackParameterObject {
    query?: {
      device_id?: string;
    };
  }

  interface NextTrackParameterObject {
    query?: {
      device_id?: string;
    };
  }

  interface PrevTrackParameterObject {
    query?: {
      device_id?: string;
    };
  }

  interface SeekToPositionParameterObject {
    query: {
      position_ms: number;
      device_id?: string;
    };
  }

  interface SetRepeatModeParameterObject {
    query: {
      state: string;
      device_id?: string;
    };
  }

  interface SetVolumeParameterObject {
    query: {
      volume_percent: number;
      device_id?: string;
    };
  }

  interface TogglePlaybackShuffleParameterObject {
    query: {
      state: boolean;
      device_id?: string;
    };
  }

  interface GetRecentlyPlayedTracksParameterObject {
    query?: {
      after?: number;
      before?: number;
      limit?: number;
    };
  }

  interface AddToPlaybackQueueParameterObject {
    query: {
      uri: string;
      device_id?: string;
    };
  }

  // -----
  interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
  }

  interface UserObjectPrivate {
    birthdate?: string;
    explicit_content?: ExplicitContent;
  }
}
