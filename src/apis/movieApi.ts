import axios from "axios";
import { BASE_URL } from "../utils/constant";
import axiosAuth from "./apiService";

export const movieApi = {
  searchMovie: (payload: any) => {
    return axios.post(`${BASE_URL}/api/movies/search`, payload);
  },
  addMovie: (payload: any) => {
    return axiosAuth.post(`${BASE_URL}/api/movies`, payload);
  },
  editMovie: (payload: any) => {
    return axiosAuth.put(`${BASE_URL}/api/movies`, payload);
  },
  deleteMovie: (id: any) => {
    return axiosAuth.delete(`${BASE_URL}/api/movies/${id}`);
  },
  getMovieById: (id: any) => {
    return axios.get(`${BASE_URL}/api/movies/${id}`);
  },
  addSeason: (id: any) => {
    return axiosAuth.put(`${BASE_URL}/api/movies/add-season/${id}`);
  },
  getStatisticMovie: (id: any) => {
    return axiosAuth.get(`${BASE_URL}/api/ratings/movie/statistic/${id}`);
  },
  getTrendingMovie: () => {
    return axios.get(`${BASE_URL}/api/movies/trending`);
  },
};
