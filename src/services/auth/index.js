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

const resetPassword = async (obj, token) => {
  return httpPost("/auth/reset-password", obj, {
    headers: {
        'authorization': `Bearer ${token}`,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }
  });
};

export { login, register, recover, resetPassword };
