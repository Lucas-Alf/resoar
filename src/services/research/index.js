import { httpDelete, httpGet, httpPost, httpPut } from "../http-client";

const getResearch = async (data) => {
  return httpGet("/research", data);
}

const getResearchById = async (id) => {
  return httpGet(`/research/${id}`);
}

const getResearchAdvanced = async (data, params) => {
  return httpGet("/research/advanced", data, params);
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

const downloadResearch = async (id, title) => {
  return httpGet(`/research/download/${id}`, null, {
    responseType: 'blob'
  })
    .then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);
      const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`

      // create "a" HTML element with href to file & click
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', fileName); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
    })
}

export {
  getResearch,
  getResearchById,
  getResearchAdvanced,
  addResearch,
  updateResearch,
  deleteResearch,
  downloadResearch
}