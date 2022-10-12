import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getKnowledgeArea = async (data) => {
  return httpGet("/knowledgeArea", data);
}

const addKnowledgeArea = async (data) => {
  return httpPost("/knowledgeArea", data);
}

const updateKnowledgeArea = async (data) => {
  return httpPut("/knowledgeArea", data);
}

const deleteKnowledgeArea = async (id) => {
  return httpDelete(`/knowledgeArea/${id}`);
}

export {
  getKnowledgeArea,
  addKnowledgeArea,
  updateKnowledgeArea,
  deleteKnowledgeArea
}