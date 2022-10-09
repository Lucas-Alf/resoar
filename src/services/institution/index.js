import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getInstitution = async (data) => {
  return httpGet("/institution", data);
}

const addInstitution = async (data) => {
  return httpPost("/institution", data);
}

const updateInstitution = async (data) => {
  return httpPut("/institution", data);
}

const deleteInstitution = async (id) => {
  return httpDelete(`/institution/${id}`);
}

export {
  getInstitution,
  addInstitution,
  updateInstitution,
  deleteInstitution
}