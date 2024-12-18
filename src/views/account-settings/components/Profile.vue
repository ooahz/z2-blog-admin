<script setup lang="ts">
import {ref} from "vue";
import type {FormInstance} from "element-plus";
import type {Result} from "@/types/result";
import type {ResetPasswordUser} from "@/types/user";
import type {UserInfo} from "@/types/user";
import {logoutUser, resetPassword} from "@/api/user";
import {message} from "@/utils/message";
import {deviceDetection, storageLocal} from "@pureadmin/utils";
import router from "@/router";
import {REGEXP_PWD} from "@/views/login/utils/rule";
import {userKey} from "@/utils/auth";

defineOptions({
  name: "Profile"
});

const isShow = ref(false);
const userInfoFormRef = ref<FormInstance>();

const userInfo = ref<ResetPasswordUser>({});

const handleClose = () => {
  isShow.value = false;
};

// 更新信息
const onSubmit = async (formEl: FormInstance) => {
  const user: UserInfo = storageLocal().getItem(userKey)
  if (!userInfo.value.password || userInfo.value.password !== userInfo.value.rePassword) {
    message("密码不一致", {type: "error"});
    return;
  }
  if (!REGEXP_PWD.test(userInfo.value.password)) {
    message("密码格式应为5-13位数字、字母、符号的任意两种组合", {type: "error"});
    return;
  }
  userInfo.value.email = user.email;
  const res: Result = await resetPassword(userInfo.value);
  if (res.state === "success") {
    message("设置成功", {type: "success"});
    const user: UserInfo = storageLocal().getItem(userKey)
    await logoutUser(user);
    await router.push("/login");
  } else {
    message(res.message, {type: "warning"});
  }
};
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">重置密码</h3>
    <el-form
      ref="userInfoFormRef"
      label-position="top"
      :model="userInfo"
    >
      <el-form-item label="请输入新的密码" prop="website" maxlength="21">
        <el-input v-model="userInfo.password" placeholder="请输入新的密码"/>
      </el-form-item>
      <el-form-item label="请再次确认新的密码" prop="avatar" maxlength="21">
        <el-input v-model="userInfo.rePassword" placeholder="请再次确认新的密码"/>
      </el-form-item>
      <el-button type="primary" @click="onSubmit(userInfoFormRef)">
        修改密码
      </el-button>
    </el-form>
  </div>
</template>
