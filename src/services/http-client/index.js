import axios from "axios";
import { isAuthenticated, getToken } from '../auth'

const httpBuilder = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: isAuthenticated() &&
    {
      'Authorization': `bearer ${getToken()}`
    }
  })
};

const httpGet = async (url, data, params = {}) => {
  return httpBuilder().get(url, {
    params: data,
    ...params,
  });
};

const httpPost = async (url, data, params) => {
  return httpBuilder().post(url, data, params);
};

const httpPut = async (url, data, params) => {
  return httpBuilder().put(url, data, params);
};

const httpDelete = async (url, params) => {
  return httpBuilder().delete(url, params);
};

export { httpGet, httpPost, httpPut, httpDelete };
