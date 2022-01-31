import * as API from "@/types/API";
import request from "../request";

export default {
  getPlaylist(
    playlist_id: string,
    fields?: string,
    market?: string
  ): Promise<SpotifyApi.SinglePlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${playlist_id}?fields=${fields}&market=${market}`,
    };
    return request<SpotifyApi.SinglePlaylistResponse>(req_options);
  },

  changePlaylistDetails(
    playlist_id: string,
    name?: string,
    publics?: boolean,
    collaborative?: boolean,
    description?: string
  ): Promise<SpotifyApi.ChangePlaylistDetailsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${playlist_id}`,
      body: JSON.stringify({ name, publics, collaborative, description }),
    };
    return request<SpotifyApi.ChangePlaylistDetailsResponse>(req_options);
  },

  getPlaylistTracks(
    playlist_id: string,
    fields?: string,
    limit?: number,
    offset?: number,
    market?: string
  ): Promise<SpotifyApi.PlaylistTrackResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${playlist_id}/tracks?fields=${fields}&limit=${limit}&offset=${offset}&market=${market}`,
    };
    return request<SpotifyApi.PlaylistTrackResponse>(req_options);
  },

  addTracksToPlaylist(
    playlist_id: string,
    position?: number,
    uris?: string[]
  ): Promise<SpotifyApi.AddTracksToPlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/playlists/${playlist_id}/tracks`,
      body: JSON.stringify({ position, uris }),
    };
    return request<SpotifyApi.AddTracksToPlaylistResponse>(req_options);
  },

  reorderPlaylistTracks(
    playlist_id: string,
    range_start?: number,
    insert_before?: number,
    range_length?: number,
    snapshot_id?: string
  ): Promise<SpotifyApi.ReorderPlaylistTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${playlist_id}/tracks`,
      body: JSON.stringify({
        range_start,
        insert_before,
        range_length,
        snapshot_id,
      }),
    };
    return request<SpotifyApi.ReorderPlaylistTracksResponse>(req_options);
  },

  replacePlaylistTracks(
    playlist_id: string,
    uris?: string[]
  ): Promise<SpotifyApi.ReplacePlaylistTracksResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${playlist_id}/tracks`,
      body: JSON.stringify({ uris }),
    };
    return request<SpotifyApi.ReplacePlaylistTracksResponse>(req_options);
  },

  removePlaylistTracks(
    playlist_id: string,
    tracks?: SpotifyApi.TrackLinkObject[]
  ): Promise<SpotifyApi.RemoveTracksFromPlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "DELETE",
      path: `/playlists/${playlist_id}/tracks`,
      body: JSON.stringify({ tracks }),
    };
    return request<SpotifyApi.RemoveTracksFromPlaylistResponse>(req_options);
  },

  getCurrentUserPlaylists(
    limit?: number,
    offset?: number
  ): Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/me/playlists?limit=${limit}&offset=${offset}`,
    };
    return request<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>(req_options);
  },

  getUserPlaylists(
    user_id: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifyApi.ListOfUsersPlaylistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/users/${user_id}/playlists?limit=${limit}&offset=${offset}`,
    };
    return request<SpotifyApi.ListOfUsersPlaylistsResponse>(req_options);
  },

  createPlaylist(
    user_id: string,
    name: string,
    publics?: boolean,
    collaborative?: boolean,
    description?: string
  ): Promise<SpotifyApi.CreatePlaylistResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "POST",
      path: `/users/${user_id}/playlists`,
      body: JSON.stringify({ name, publics, collaborative, description }),
    };
    return request<SpotifyApi.CreatePlaylistResponse>(req_options);
  },

  getFeaturedPlaylists(
    country?: string,
    locale?: string,
    timestamp?: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/browse/featured-playlists?country=${country}&locale=${locale}&timestamp=${timestamp}&limit=${limit}&offset=${offset}`,
    };
    return request<SpotifyApi.ListOfFeaturedPlaylistsResponse>(req_options);
  },

  getCategorysPlaylists(
    category_id: string,
    country?: string,
    limit?: number,
    offset?: number
  ): Promise<SpotifyApi.CategoryPlaylistsResponse | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/browse/categories/${category_id}/playlists?country=${country}&limit=${limit}&offset=${offset}`,
    };
    return request<SpotifyApi.CategoryPlaylistsResponse>(req_options);
  },

  getPlaylistImage(
    playlist_id: string
  ): Promise<SpotifyApi.ImageObject[] | API.NullOrError> {
    const req_options: API.Request = {
      method: "GET",
      path: `/playlists/${playlist_id}/images`,
    };
    return request<SpotifyApi.ImageObject[]>(req_options);
  },

  setPlaylistImage(playlist_id: string): Promise<API.NullOrError> {
    const req_options: API.Request = {
      method: "PUT",
      path: `/playlists/${playlist_id}/images`,
    };
    return request(req_options);
  },
};
