import {http} from "@/utils/http";
import type {AuthorInfo} from "@/types/author"
import {Result} from "@/types/result";

const BASE_URL = "admin/v1/a/author";

export const getAuthorInfo = () => {
  return http.requestAndFormatData<AuthorInfo>("get", BASE_URL);
};

export const updateAuthorInfo = (data: AuthorInfo) => {
  return http.request<Result<AuthorInfo>>("put", BASE_URL, {data});
};
