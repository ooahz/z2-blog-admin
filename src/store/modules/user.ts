import {defineStore} from "pinia";
import {store} from "@/store";
import type {userType} from "./types";
import {resetRouter, router} from "@/router";
import {storageLocal} from "@pureadmin/utils";
import {getLogin, logoutUser} from "@/api/user";
import {removeToken, userKey} from "@/utils/auth";
import type {UserInfo} from "@/types/user";

export const useUserStore = defineStore({
  id: "admin-user",
  state: (): userType => ({
    // 用户名
    name: storageLocal().getItem<UserInfo>(userKey)?.name ?? "",
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7
  }),
  actions: {
    /** 存储用户名 */
    SET_name(name: string) {
      this.name = name;
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles;
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool;
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value);
    },
    /** 登入 */
    async loginByname(data) {
      return await getLogin(data);
    },
    /** 退出登录） */
    logOut() {
      const user: UserInfo = storageLocal().getItem(userKey);
      logoutUser(user);
      this.name = "";
      this.roles = [];
      removeToken();
      resetRouter();
      router.push("/login");
    },
  }
});

export function useUserStoreHook() {
  return useUserStore(store);
}
