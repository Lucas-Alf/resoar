import { httpGet } from "../http-client";

const getResearch = async (data) => {
  return httpGet("/research", data);
}

export {
  getResearch
}