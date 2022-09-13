import { httpGet } from "../http-client";

const getResearch = async (data) => {
  return httpGet("/research", data);
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
  getResearchTypeDescription
}