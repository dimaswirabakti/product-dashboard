import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// AXIOS INSTANCE
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://dummyjson.com",
  timeout: 10_000, // 10s
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          console.error("[API] Unauthorized — please log in");
          break;

        case 403:
          console.error("[API] Forbidden — insufficient permissions");
          break;

        case 404:
          // Resource tidak ditemukan
          break;

        case 429:
          console.error("[API] Rate limited — too many requests");
          break;

        case 500:
          console.error("[API] Server error — please try again later");
          break;
      }
    } else if (error.request) {
      // Request dikirim tapi tidak ada response
      console.error("[API] Network error — check your connection");
    }

    // Re-throw agar TanStack Query bisa handle
    return Promise.reject(error);
  },
);

export default apiClient;
