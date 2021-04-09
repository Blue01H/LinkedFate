import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import config from "../config";
import { cancelable } from "cancelable-promise";

async function getToken() {
  const token = await AsyncStorage.getItem("@storage_token");
  return token;
}

async function setToken(token) {
  await AsyncStorage.setItem("@storage_token", token);
}

async function getUser() {
  try {
    const user = await AsyncStorage.getItem("@storage_user");
    return JSON.parse(user);
  } catch {
    return null;
  }
}

async function setUser(user) {
  await AsyncStorage.setItem("@storage_user", JSON.stringify(user));
}

async function getHeaders(type = "application/json") {
  const token = await getToken();
  const headers = new Headers();
  headers.set("Authorization", token);
  headers.set("Content-Type", type);
  return headers;
}

async function update() {
  const data = await fetchData();
  await setUser(data);
  return data;
}

async function fetchData() {
  const headers = await getHeaders();
  const response = await fetch(`${config.API_URL}/user`, {
    headers: headers,
  });
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    const error = await response.text();
    throw new Error(error);
  }
}

async function getData() {
  try {
    const user = await getUser();
    if (!user) throw "No user";
    return user;
  } catch {
    const data = await update();
    return data;
  }
}

async function logout() {
  await AsyncStorage.removeItem("@storage_token");
  await AsyncStorage.removeItem("@storage_user");
}

async function isLogged() {
  try {
    const data = await getData();
    if (!data) throw "No data";
    return true;
  } catch {
    return false;
  }
}

async function login(email, password) {
  const response = await fetch(`${config.API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 200) {
    const token = await response.text();
    await setToken(token);
    const data = await getData();
    return data;
  } else {
    const text = await response.text();
    throw new Error(text);
  }
}

async function register(email, password, names, surnames, phone, role) {
  const response = await fetch(`${config.API_URL}/user`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      names: names,
      surnames: surnames,
      phone: phone,
      role: role,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status == 200) {
    const token = await response.text();
    await setToken(token);
    const data = await getData();
    return data;
  } else {
    const text = await response.text();
    throw new Error(text);
  }
}

/**
 *
 * @returns {{current: "request"|"logged"|"error", error: Error, user: JSON}}
 */
function useAuth() {
  const [status, setStatus] = useState({
    current: "request",
    user: null,
    error: null,
  });

  useEffect(() => {
    if (status.current == "request") {
      const promise = cancelable(getData());
      promise
        .then((user) => {
          setStatus({
            ...status,
            current: "logged",
            user: user,
          });
        })
        .catch((err) => {
          setStatus({
            ...status,
            current: "error",
            error: err,
          });
        });

      return () => {
        promise.cancel();
      };
    }
    return void 0;
  }, [status]);

  return status;
}

export default {
  getToken,
  logout,
  getData,
  login,
  getHeaders,
  register,
  isLogged,
  useAuth,
};
export {
  getToken,
  logout,
  getData,
  login,
  getHeaders,
  register,
  isLogged,
  useAuth,
};
