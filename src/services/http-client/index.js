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

const transformRequestOptions = params => {
  let options = '';
  for (const key in params) {
    if (typeof params[key] !== 'object' && params[key]) {
      options += `${key}=${params[key]}&`;
    } else if (typeof params[key] === 'object' && params[key] && params[key].length) {
      params[key].forEach(el => {
        options += `${key}=${el}&`;
      });
    }
  }
  return options ? options.slice(0, -1) : options;
};

export { httpGet, httpPost, httpPut, httpDelete, transformRequestOptions };
