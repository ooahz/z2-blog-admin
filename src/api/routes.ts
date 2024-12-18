import {http} from "@/utils/http";
import {Result} from "postcss";

const BASE_URL = "blog/v1/a/routes";

export const getAsyncRoutes = () => {
  return http.request<Result>("get", BASE_URL);
};
