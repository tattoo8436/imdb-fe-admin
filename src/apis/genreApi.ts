import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { ISearchGenre } from "../utils/type";
import axiosAuth from "./apiService";

export const genreApi = {
  searchGenre: (payload: ISearchGenre) => {
    return axios.post(`${BASE_URL}/api/genres/search`, payload);
  },
  addGenre: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/genres`, payload);
  },
  editGenre: (payload: any) => {
    return axiosAuth.put(`${BASE_URL}/api/genres`, payload);
  },
  deleteGenre: (id: number) => {
    return axiosAuth.delete(`${BASE_URL}/api/genres/${id}`);
  },
};
