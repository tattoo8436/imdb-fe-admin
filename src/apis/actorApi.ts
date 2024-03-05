import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { ISearchActor } from "../utils/type";
import axiosAuth from "./apiService";

export const actorApi = {
  searchActor: (payload: ISearchActor) => {
    return axios.post(`${BASE_URL}/api/actors/search`, payload);
  },
  addActor: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/actors`, payload);
  },
  editActor: (payload: any) => {
    return axiosAuth.put(`${BASE_URL}/api/actors`, payload);
  },
  deleteActor: (id: any) => {
    return axiosAuth.delete(`${BASE_URL}/api/actors/${id}`);
  },
};
