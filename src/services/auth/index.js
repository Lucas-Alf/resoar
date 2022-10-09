import { get, isEmpty, split, last, head, toNumber } from "lodash";
import { httpPost } from "../http-client";
import jwt_decode from "jwt-decode";

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
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

const isAuthenticated = () => {
  const localData = localStorage.getItem("authToken");
  if (!localData || isEmpty(localData))
    return false;

  const authToken = JSON.parse(localData)
  const expiration = new Date(get(authToken, "expiration"));
  return expiration > new Date()
}

const getUser = () => {
  const localData = localStorage.getItem("authToken");
  if (!localData || isEmpty(localData))
    return null;

  const authToken = JSON.parse(localData)
  return jwt_decode(get(authToken, 'token'))
}

const getToken = () => {
  const localData = localStorage.getItem("authToken");
  if (!localData || isEmpty(localData))
    return null;

  const authToken = JSON.parse(localData)
  return get(authToken, 'token')
}

const getUserId = () => toNumber(get(getUser(), 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier', ''))
const getUserName = () => get(getUser(), 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name', '')

const getUserImagePath = () => {
  const userData = JSON.parse(get(getUser(), 'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata', '{}'))
  return get(userData, 'imagePath', '')
}

const getShortUserName = () => {
  const namePieces = split(getUserName(), ' ')
  if (namePieces.length == 1) {
    return namePieces[0]
  } else {
    return `${head(namePieces)} ${last(namePieces)}`
  }
}

export {
  login,
  register,
  recover,
  resetPassword,
  isAuthenticated,
  getToken,
  getUser,
  getUserId,
  getUserName,
  getShortUserName,
  getUserImagePath
};
