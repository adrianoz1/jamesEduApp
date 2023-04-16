import axios, { AxiosError, AxiosInstance } from "axios";
import { AppError } from "../utils/AppError";
import {
  storageAuthTokenGet,
  storageAuthTokenSave,
} from "../storage/authTokenStorage";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => void;
};

const api = axios.create({
  baseURL: "http://0.0.0.0:3333",
}) as ApiInstanceProps;

let failedRequestQueue: PromiseType[] = [];
let isRefreshing = false;

api.registerInterceptTokenManager = (signOut) => {
  const interceptorTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      console.error(requestError);

      if (requestError?.response?.status === 401) {

        if (
          requestError.response.data.message === "Token expired." ||
          requestError.response.data.message === "Invalid token."
        ) {
          const token = await storageAuthTokenGet();
          if (!token?.refreshToken) {
            signOut();
            return Promise.reject(requestError);
          }

          const originalRequestConfig = requestError.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedRequestQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }
          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.patch("/token/refresh");
              
              await storageAuthTokenSave(data.token, data.refresh_token);

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.token}`,
              };
              api.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.token}`;

              failedRequestQueue.forEach((request) => {
                request.onSuccess(data.token);
              });

              resolve(api(originalRequestConfig));
            } catch (error: any) {
              failedRequestQueue.forEach((request) => {
                request.onFailure(error);
              });

              signOut();
              reject(error);
            } finally {
              isRefreshing = false;
              failedRequestQueue = [];
            }
          });
        }

        signOut();
      }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => {
    api.interceptors.response.eject(interceptorTokenManager);
  };
};

export { api };
