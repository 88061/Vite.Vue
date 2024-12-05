import { request } from "@request";

export const getYiyan = (): Promise<{
  author: string;
}> => {
  return request.get("/oioweb/api/common/yiyan");
};
