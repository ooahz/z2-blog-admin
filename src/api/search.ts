import {http} from "@/utils/http";
import {ResultList} from "@/types/result";
import {Article} from "@/types/article";

const BASE_URL = "blog/v1/search";

export const searchByKeyword = (params?: any) => {
  return http.request<ResultList<Article>>("get", BASE_URL, {params});
};
