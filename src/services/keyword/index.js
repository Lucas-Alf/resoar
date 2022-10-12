import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getKeyword = async (data) => {
  return httpGet("/keyword", data);
}

const addKeyword = async (data) => {
  return httpPost("/keyword", data);
}

const updateKeyword = async (data) => {
  return httpPut("/keyword", data);
}

const deleteKeyword = async (id) => {
  return httpDelete(`/keyword/${id}`);
}

export {
  getKeyword,
  addKeyword,
  updateKeyword,
  deleteKeyword
}