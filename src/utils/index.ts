import { TrackListInterface } from "@/components/TrackList/types";

export function paramObjToQueryStr<T>(opts: T): string {
  let result = "";

  JSON.parse(JSON.stringify(opts), (key, val) => {
    result += `${key}=${val}&`;
  });

  return result;
}

export function queryObjToStr<T>(query: T): string {
  let result = "";

  if (query)
    JSON.parse(JSON.stringify(query), (key, val) => {
      result += `${key}=${val}&`;
    });

  return result;
}

export function msToTime(ms: number, format: boolean): string {
  const h = Math.trunc(ms / 3600000);
  const m = Math.trunc((ms - h * 3600000) / 60000);
  const s = Math.trunc((ms - h * 3600000 - m * 60000) / 1000);
  let h_sep = ":";
  let m_sep = ":";
  let s_sep = "";

  if (format) {
    h_sep = "h ";
    m_sep = "m ";
    s_sep = "s";
  }

  let time = "";
  if (h) {
    time += `${h}${h_sep}`;
    if (m < 10) time += `0${m}${m_sep}`;
    else time += `${m}${m_sep}`;
  } else time += `${m}${m_sep}`;
  if (s < 10) time += `0${s}${s_sep}`;
  else time += `${s}${s_sep}`;

  return time;
}

export function getImageUrl(album: Spotify.Album, find_max: boolean): string {
  let url = "";
  if (album && "images" in album) {
    const images = album.images;
    url = images[0].url;

    if (images[0].height) {
      let curr_size: number = images[0].height;
      images.forEach((img: Spotify.Image) => {
        if (img.height) {
          if (find_max) {
            if (img.height >= curr_size) {
              url = img.url;
              curr_size = img.height;
            }
          } else {
            if (img.height <= curr_size) {
              url = img.url;
              curr_size = img.height;
            }
          }
        }
      });
    }
  }
  return url;
}

export function spotifyUriParse(uri: string): { type: string; val: string } {
  const uri_arr = uri.split(":");
  return {
    type: uri_arr[1],
    val: uri_arr[2],
  };
}

export function getTracksArray(
  tracks: SpotifyApi.TrackObjectFull[]
): TrackListInterface[] {
  const list: TrackListInterface[] = [];
  tracks.forEach((track: SpotifyApi.TrackObjectFull) => {
    const t: TrackListInterface = {
      name: track.name,
      duration: msToTime(track.duration_ms, false),
      artists: track.artists,
      image: getImageUrl(track.album, false),
      uri: track.uri,
    };
    list.push(t);
  });
  return list;
}
