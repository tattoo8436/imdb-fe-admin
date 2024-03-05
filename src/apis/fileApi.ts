import { BASE_URL } from "../utils/constant";
import axiosAuth from "./apiService";

export const fileApi = {
  uploadImage: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/files/image`, payload);
  },
};
