import { httpPost } from "../http-client";

const login = async (obj) => {
  return httpPost("/auth/login", obj);
};

const register = async (obj) => {
  return httpPost("/auth/register", obj);
};

const recover = async (obj) => {
  return httpPost("/auth/recover", obj);
};

export { login, register, recover };
