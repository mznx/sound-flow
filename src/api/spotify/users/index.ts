import * as API from "@/types/API";
import * as utils from "@/utils";
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

  getUserTopArtists(
    opts: SpotifyApi.GetUserTopArtistsParameterObject
  ): Promise<SpotifyApi.UsersTopArtistsResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/top/artists?${query}`,
    };
    return request<SpotifyApi.UsersTopArtistsResponse>(req_options);
  },

  getUserTopTracks(
    opts: SpotifyApi.GetUserTopTracksParameterObject
  ): Promise<SpotifyApi.UsersTopTracksResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/top/tracks?${query}`,
    };
    return request<SpotifyApi.UsersTopTracksResponse>(req_options);
  },

  getUserProfile(
    opts: SpotifyApi.GetUserProfileParameterObject
  ): Promise<SpotifyApi.UserProfileResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/users/${opts.params.user_id}`,
    };
    return request<SpotifyApi.UserProfileResponse>(req_options);
  },

  followPlaylist(
    opts: SpotifyApi.FollowPlaylistParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${opts.params.playlist_id}/followers`,
      body: JSON.stringify(opts),
    };
    return request(req_options);
  },

  unfollowPlaylist(
    opts: SpotifyApi.UnfollowPlaylistParameterObject
  ): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: `/playlists/${opts.params.playlist_id}/followers`,
    };
    return request(req_options);
  },

  getFollowedArtists(
    opts: SpotifyApi.GetFollowedArtistsParameterObject
  ): Promise<SpotifyApi.UsersFollowedArtistsResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/following?${query}`,
    };
    return request<SpotifyApi.UsersFollowedArtistsResponse>(req_options);
  },

  followArtistsOrUsers(
    opts: SpotifyApi.FollowArtistsOrUsersParameterObject
  ): Promise<SpotifyApi.FollowArtistsOrUsersResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "PUT",
      path: `/me/following?${query}`,
    };
    return request<SpotifyApi.FollowArtistsOrUsersResponse>(req_options);
  },

  unfollowArtistsOrUsers(
    opts: SpotifyApi.UnfollowArtistsOrUsersParameterObject
  ): Promise<SpotifyApi.UnfollowArtistsOrUsersResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "DELETE",
      path: `/me/following?${query}`,
    };
    return request<SpotifyApi.UnfollowArtistsOrUsersResponse>(req_options);
  },

  checkUserFollowArtistsOrUsers(
    opts: SpotifyApi.CheckUserFollowArtistsOrUsersParameterObject
  ): Promise<SpotifyApi.UserFollowsUsersOrArtistsResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/me/following/contains?${query}`,
    };
    return request<SpotifyApi.UserFollowsUsersOrArtistsResponse>(req_options);
  },

  checkUsersFollowPlaylist(
    opts: SpotifyApi.CheckUsersFollowPlaylistParameterObject
  ): Promise<SpotifyApi.UsersFollowPlaylistResponse | API.NullOrError> {
    const query = utils.queryObjToStr(opts.query);
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${opts.params.playlist_id}/followers/contains?${query}`,
    };
    return request<SpotifyApi.UsersFollowPlaylistResponse>(req_options);
  },
};
