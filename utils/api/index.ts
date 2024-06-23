import axios from "axios";
import { toast } from "react-toastify";
import { ENDPOINTS } from "./network";
import { AxiosRequestMethods } from "../../constants/network";
import { IRequest } from "../../interfaces";
import { isCSR } from "../../helpers";

const PUBLIC_ENDPOINTS: IRequest[] = [ENDPOINTS.getNonce, ENDPOINTS.verifyNonce, ENDPOINTS.profile];
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    Authorization: isCSR ? `Bearer ${localStorage.getItem("jwt")}` : null,
  },
});

export const request = ({
  method,
  url,
  payload,
}: {
  method: AxiosRequestMethods;
  url: string;
  payload?: Record<string, any>;
}) => axiosInstance[method](url, payload);

const signOutLocally = () => {
  const toastId = "session-expired";

  localStorage.removeItem("jwt");

  if (!toast.isActive(toastId)) {
    toast.error("Your session has expired: Please log in again to continue", {
      toastId,
    });
  }
  // setTimeout(() => {
  //   window.location.href = "/"; // ! change based on project
  // }, 2000);
};

axiosInstance.interceptors.request.use(function onFulfilled(config) {
  config.headers["x-href"] = document.location.href;
  const jwt = localStorage.getItem("jwt");
  config.headers.Authorization = `Bearer ${jwt}`;

  if (PUBLIC_ENDPOINTS.map(({ url }) => url).includes(config.url || "")) {
    return { ...config };
  } else {
    if (!jwt) {
      signOutLocally();
    }
    return { ...config };
  }
});
