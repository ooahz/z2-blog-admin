import {http} from "@/utils/http";
import {ResultList} from "@/types/result";
import {Article} from "@/types/article";

const BASE_URL = "admin/v1/a/search";

export const searchByKeyword = (params?: any) => {
  return http.request<ResultList<Article>>("get", BASE_URL + "/keyword", {params});
};
