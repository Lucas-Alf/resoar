import axios from "axios";

const http = axios.create({
  baseURL:
    !import.meta.env.MODE || import.meta.env.MODE === "development"
      ? "https://localhost:5000"
      : "https://resoar-api.herokuapp.com",
});

const httpGet = async (url, data, params = {}) => {
  return http.get(url, {
    params: data,
    ...params,
  });
};

const httpPost = async (url, data, params) => {
  return http.post(url, data, params);
};

const httpPut = async (url, data, params) => {
  return http.put(url, data, params);
};

const httpDelete = async (url, params) => {
  return http.delete(url, params);
};

export { httpGet, httpPost, httpPut, httpDelete };
