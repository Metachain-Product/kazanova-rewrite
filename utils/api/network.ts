import { AxiosRequestMethods } from "../../constants/network";
import { IRequest } from "../../interfaces";

export const ENDPOINTS: Record<string, IRequest> = {
  getNonce: {
    method: AxiosRequestMethods.GET,
    url: "/get-sign-message",
  },
  verifyNonce: {
    method: AxiosRequestMethods.POST,
    url: "/register-check",
  },
  logout: {
    method: AxiosRequestMethods.POST,
    url: "/logout",
  },
  profile: {
    method: AxiosRequestMethods.GET,
    url: "/profile/data",
  },
};
