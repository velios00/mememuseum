import { AxiosResponse } from "axios";
import { AuthRequest } from "../shared/models/AuthRequest.model";
import { User } from "../shared/models/User.model";
import { API } from "../axios/Interceptors";
import { AuthResponse } from "../shared/models/AuthResponse.model";

export function login(
  authRequest: AuthRequest
): Promise<AxiosResponse<AuthResponse>> {
  return API.post(`${API.defaults.baseURL}/login`, authRequest);
}

export function register(
  authRequest: AuthRequest
): Promise<AxiosResponse<User>> {
  return API.post(`${API.defaults.baseURL}/register`, authRequest);
}