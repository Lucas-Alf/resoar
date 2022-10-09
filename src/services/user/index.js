import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getUser = async (data) => {
  return httpGet("/user", data);
}

const addUser = async (data) => {
  return httpPost("/user", data);
}

const updateUser = async (data) => {
  return httpPut("/user", data);
}

const deleteUser = async (id) => {
  return httpDelete(`/user/${id}`);
}

export {
  getUser,
  addUser,
  updateUser,
  deleteUser
}