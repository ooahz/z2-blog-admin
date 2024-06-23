import {http} from "@/utils/http";
import {Result} from "@/types/result";
import {LoginUser, UserInfo} from "@/types/user";

const BASE_URL = "admin/v1";

export const getLogin = (data: LoginUser) => {
  return http.request<Result<UserInfo>>("post", BASE_URL + "/login", {data});
};

export const logoutUser = (data: UserInfo) => {
  return http.request<Result<UserInfo>>("post", BASE_URL + "/logout", {data});
};
