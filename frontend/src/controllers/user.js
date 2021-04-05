import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config";

async function getToken() {
  const token = await AsyncStorage.getItem("@storage_token");
  return token;
}

async function getHeaders(token = undefined) {
  if (!token) token = await getToken();
  const headers = new Headers();
  headers.set("Authorization", token);
  return headers;
}

async function setToken(token) {
  await AsyncStorage.setItem("@storage_token", token);
}

async function deleteToken() {
  await AsyncStorage.removeItem("@storage_token");
}

async function getData(token = undefined) {
  const headers = await getHeaders(token);
  headers.set("Content-Type", "application/json");
  const response = await fetch(`${config.API_URL}/user`, {
    headers: headers,
  });
  const data = await response.json();
  return data;
}

export default { getToken, setToken, getData, deleteToken, getHeaders };
export { getToken, setToken, getData, deleteToken, getHeaders };
