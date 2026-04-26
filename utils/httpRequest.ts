import axios, { AxiosRequestConfig } from "axios";

type Props = {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  config?: AxiosRequestConfig;
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      document.cookie = "access_token=";
      document.cookie = "refresh_token=";
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default async function httpRequest<T>({
  path,
  method = "GET",
  config,
}: Props): Promise<T> {
  try {
    const response = await instance({
      url: path,
      method,
      ...config,
    });
    return response.data as T;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "HTTP Request Error:",
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.detail ||
          error.message ||
          "Something went wrong with the request",
      );
    }
    console.error("Unexpected Error:", error);
    throw new Error("An unexpected error occurred");
  }
}
