import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getResearch = async (data) => {
  return httpGet("/research", data);
}

const addResearch = async (data, params) => {
  return httpPost("/research", data, params);
}

const updateResearch = async (data) => {
  return httpPut("/research", data);
}

const deleteResearch = async (id) => {
  return httpDelete(`/research/${id}`);
}

export {
  getResearch,
  addResearch,
  updateResearch,
  deleteResearch
}