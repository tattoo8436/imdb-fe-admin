import axios from "axios";

const axiosAuth = axios.create();

axiosAuth.interceptors.request.use(
  function (config) {
    const accessToken = JSON.parse(
      localStorage.getItem("account") ?? "{}"
    ).accessToken;
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosAuth.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
export default axiosAuth;
