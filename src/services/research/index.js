import { httpGet } from "../http-client";

const getResearch = async () => {
  return httpGet("/research");
}

export {
  getResearch
}