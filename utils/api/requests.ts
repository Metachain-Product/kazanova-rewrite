import { request } from ".";
import { ENDPOINTS } from "./network";

export const getNonce = async (): Promise<string> => {
  const res = await request(ENDPOINTS.getNonce);
  return res.data.data.message;
};

export const verifyNonce = async (payload: Record<string, any>) => {
  return request({
    ...ENDPOINTS.verifyNonce,
    payload,
  });
};

export const logout = async () => {
  return request(ENDPOINTS.logout);
};

export const getProfile = async () => {
  return request(ENDPOINTS.profile);
};
