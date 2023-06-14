import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getToken } from "../auth/TokenManager";
const serverUrl = "http://localhost:3000/";

async function sendRequest<T>(
  method: "GET" | "POST" | "DELETE" | "PUT",
  url: string,
  data?: any
): Promise<T> {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };

  const config: AxiosRequestConfig = {
    method,
    url,
    headers,
    data,
  };

  try {
    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error: unknown) {
    throw new Error(`Request failed: ${error}`);
  }
}

const getRequest = async (route: string) => {
  try {
    const data = await sendRequest<any>("GET", `${serverUrl}${route}`);

    return data;
  } catch (err) {
    console.log(err);
  }
};
