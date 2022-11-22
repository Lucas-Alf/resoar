import { httpDelete, httpGet, httpPost } from "../http-client";

const getUserSavedResearch = async (data) => {
  return httpGet("/UserSavedResearch", data);
}

const getUserSavedResearchExists = async (researchId) => {
  return httpGet(`/UserSavedResearch/${researchId}`);
}

const addUserSavedResearch = async (researchId) => {
  return httpPost(`/UserSavedResearch/${researchId}`);
}

const deleteUserSavedResearch = async (researchId) => {
  return httpDelete(`/UserSavedResearch/${researchId}`);
}

export {
  getUserSavedResearch,
  getUserSavedResearchExists,
  addUserSavedResearch,
  deleteUserSavedResearch
}