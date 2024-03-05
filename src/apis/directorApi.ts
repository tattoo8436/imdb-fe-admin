import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { ISearchDirector } from "../utils/type";
import axiosAuth from "./apiService";

export const directorApi = {
  searchDirector: (payload: ISearchDirector) => {
    return axios.post(`${BASE_URL}/api/directors/search`, payload);
  },
  addDirector: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/directors`, payload);
  },
  editDirector: (payload: any) => {
    return axiosAuth.put(`${BASE_URL}/api/directors`, payload);
  },
  deleteDirector: (id: number) => {
    return axiosAuth.delete(`${BASE_URL}/api/directors/${id}`);
  },
};
