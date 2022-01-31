import * as API from "@/types/API";
import request from "../request";

export default {
  getCurrentUsersProfile(): Promise<
    SpotifyApi.CurrentUsersProfileResponse | API.NullOrError
  > {
    const req_options: API.Request = {
      method: "GET",
      path: "/me",
    };
    return request<SpotifyApi.CurrentUsersProfileResponse>(req_options);
  },

  getUsersTopArtists(
    limit?: number,
    offset?: number,
    time_range?: string
  ): Promise<SpotifyApi.UsersTopArtistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/top/artists?limit=${limit}&offset=${offset}&time_range=${time_range}`,
    };
    return request<SpotifyApi.UsersTopArtistsResponse>(req_options);
  },

  getUsersTopTracks(
    limit?: number,
    offset?: number,
    time_range?: string
  ): Promise<SpotifyApi.UsersTopTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/top/tracks?limit=${limit}&offset=${offset}&time_range=${time_range}`,
    };
    return request<SpotifyApi.UsersTopTracksResponse>(req_options);
  },

  getUsersProfile(
    user_id: number
  ): Promise<SpotifyApi.UserProfileResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/users/${user_id}`,
    };
    return request<SpotifyApi.UserProfileResponse>(req_options);
  },

  followPlaylist(
    playlist_id: string,
    is_public?: boolean
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${playlist_id}/followers`,
      body: JSON.stringify({ public: is_public }),
    };
    return request(req_options);
  },

  unfollowPlaylist(playlist_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: `/playlists/${playlist_id}/followers`,
    };
    return request(req_options);
  },

  getFollowedArtists(
    limit?: number,
    after?: string,
    type?: string
  ): Promise<SpotifyApi.UsersFollowedArtistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/following?limit=${limit}&after=${after}&type=${type}`,
    };
    return request<SpotifyApi.UsersFollowedArtistsResponse>(req_options);
  },

  followArtistsOrUsers(
    type: string,
    ids: string[]
  ): Promise<SpotifyApi.FollowArtistsOrUsersResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/following?type=${type}`,
      body: JSON.stringify({ ids }),
    };
    return request<SpotifyApi.FollowArtistsOrUsersResponse>(req_options);
  },

  unfollowArtistsOrUsers(
    type: string,
    ids: string[]
  ): Promise<SpotifyApi.UnfollowArtistsOrUsersResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: `/me/following?type=${type}`,
      body: JSON.stringify({ ids }),
    };
    return request<SpotifyApi.UnfollowArtistsOrUsersResponse>(req_options);
  },

  checkUserFollowArtistsOrUsers(
    type: string,
    ids: string
  ): Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/following/contains?type=${type}&ids=${ids}`,
    };
    return request<SpotifyApi.UserFollowsUsersOrArtistsResponse>(req_options);
  },

  checkUsersFollowPlaylist(
    playlist_id: string,
    ids: string
  ): Promise<SpotifyApi.UsersFollowPlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${playlist_id}/followers/contains?ids=${ids}`,
    };
    return request<SpotifyApi.UsersFollowPlaylistResponse>(req_options);
  },
};
