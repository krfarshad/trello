import axios, { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL } from "@/config";

// creation api model instance
const createApiInstance = (baseURL: string): AxiosInstance =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // "Client-Token": DEFAULT_CLIENT_TOKEN,
    },
  });

// define api model based on our services
export const apiModel: AxiosInstance = createApiInstance(API_BASE_URL);

// return data interceptor
const responseInterceptor = (response: AxiosResponse) => response.data;

const errorInterceptor = (error: any) => {
  if (!error.response) {
    console.log("Network error. Please try again later.");
  }

  const { status, data } = error.response;

  return Promise.reject({
    status,
    message: data?.message || "An error occurred",
    errors: data?.errors || null,
  });
};

[apiModel].forEach((instance) => {
  instance.interceptors.response.use(responseInterceptor, errorInterceptor);
});
