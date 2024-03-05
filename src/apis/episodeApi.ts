import { BASE_URL } from "../utils/constant";
import axiosAuth from "./apiService";

export const episodeApi = {
  addEpisode: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/episodes`, payload);
  },
  editEpisode: (payload: any) => {
    return axiosAuth.put(`${BASE_URL}/api/episodes`, payload);
  },
  deleteEpisode: (id: any) => {
    return axiosAuth.delete(`${BASE_URL}/api/episodes/${id}`);
  },
};
