import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getResearch = async (data) => {
  return httpGet("/research", data);
}

const addResearch = async (data) => {
  return httpPost("/research", data);
}

const updateResearch = async (data) => {
  return httpPut("/research", data);
}

const deleteResearch = async (id) => {
  return httpDelete(`/research/${id}`);
}

const getResearchTypeDescription = (type) => {
  switch (type) {
    case 1:
      return 'Artigo Científico'
    case 2:
      return 'Relatório de Pesquisa'
    case 3:
      return 'Tese'
    case 4:
      return 'Relato Técnico'
    case 5:
      return 'Paper'
    case 6:
      return 'Livro'
    default:
      return '';
  }
}

export {
  getResearch,
  addResearch,
  updateResearch,
  deleteResearch,
  getResearchTypeDescription
}