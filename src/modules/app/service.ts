import { request } from "@request";

const USER_URL = "/common/api";

export const getUserInfo = (id: number): Promise<{ list: string[] }> => {
  return request.post(USER_URL + "/getUserInfo/" + id);
};
