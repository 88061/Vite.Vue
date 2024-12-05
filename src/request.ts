/**
 * @axios
 * @README 请求拦截处理，使用参考 @/app/service
 */
import axios, { type AxiosResponse } from "axios";
const instance = axios.create({
  baseURL: "",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data } = response;
    if (status === 200) {
      return data;
      if ((data as BackendResponse).code === 200) {
        return data.data;
      } else {
        // hint data.message
        return Promise.reject(new Error(data.message));
      }
    }

    return Promise.reject(new Error("请求失败!"));
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const request = instance;

export type BackendResponse = {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
};

// export type Response<T> = Promise<{
//     code: number;
//     message: string;
//     result: T;
//   }>;
