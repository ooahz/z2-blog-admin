import {http} from "@/utils/http";
import {HomeStatistics} from "@/types/statistics";

const BASE_URL = "admin/v1/a/statistics";

export const homeStatistics = () => {
  return http.requestAndFormatData<HomeStatistics>("get", BASE_URL);
};

