import {storageLocal} from "@pureadmin/utils";
import {UserInfo} from "@/types/user";

export const userKey = "user-info";

export function setUserInfo(data: UserInfo) {
  storageLocal().setItem(userKey, data);
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  storageLocal().removeItem(userKey);
}
