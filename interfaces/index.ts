import { AxiosRequestMethods } from "../constants/network";

export interface IRequest {
  url: string;
  method: AxiosRequestMethods;
}
