import { StyleSheet, Text, View } from "react-native";
import React from "react";
import axios from "axios";
import Constants from "expo-constants";
import { USER_TOKEN_KEY } from "../Providers/AuthPRovider";
// import { BaseUrl } from "./Aws";
/* recupera datos del dispositivo Constants.manifest.url_api */
import * as SecureStore from "expo-secure-store";
const Base_URL = "https://insucons.website/api";
const axiosInstance = axios.create({
  baseURL: `${Base_URL}/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
/* intersectando las respuestas de la API */

axiosInstance.interceptors.request.use(async (req) => {
  const access_token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
  req.headers["Authorization"] = `Bearer ${access_token}`;
  return req;
});

export default axiosInstance;
