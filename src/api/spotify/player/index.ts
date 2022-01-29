import * as API from "@/types/API";
import request from "../request";

export default {
  getPlaybackState() {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player",
    };
    return request(req_options);
  },

  getAvailableDevices() {
    const req_options: API.Request = {
      method: "GET",
      path: "/me/player/devices",
    };
    return request(req_options);
  },

  transferPlayback(device_id: string) {
    const req_options: API.Request = {
      method: "PUT",
      path: "/me/player",
      body: JSON.stringify({ device_ids: [device_id] }),
    };
    return request(req_options);
  },
};
