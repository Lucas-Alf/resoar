import { httpGet } from "../http-client";

const getArticles = async () => {
  return httpGet("/auth/login");
}