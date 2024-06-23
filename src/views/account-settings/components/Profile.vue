<script setup lang="ts">
import {reactive, ref} from "vue";
import {message} from "@/utils/message";
import type {AuthorInfo, AuthorInfoSave} from "@/types/author";
import type {FormInstance, FormRules} from "element-plus";
import {deviceDetection} from "@pureadmin/utils";
import {getAuthorInfo, updateAuthorInfo} from "@/api/author";
import router from "@/router";
import {Result} from "@/types/result";

defineOptions({
  name: "Profile"
});

const isShow = ref(false);
const userInfoFormRef = ref<FormInstance>();

const blogInfo = reactive({
  avatar: "",
  website: "",
  name: "",
  siteName: "",
  extendsParams: {}
} as AuthorInfo);

const rules = reactive<FormRules<AuthorInfo>>({
  name: [{required: true, message: "昵称必填", trigger: "blur"}],
  avatar: [{required: true, message: "头像必填", trigger: "blur"}],
  website: [{required: true, message: "网站地址必填", trigger: "blur"}],
  siteName: [{required: true, message: "网站名称必填", trigger: "blur"}]
});

function queryEmail(queryString, callback) {
  const emailList = [
    {value: "@ahzoo.cn"},
    {value: "@qq.com"},
    {value: "@163.com"},
    {value: "@outlook.com"}
  ];
  let results = [];
  let queryList = [];
  emailList.map(item =>
    queryList.push({value: queryString.split("@")[0] + item.value})
  );
  results = queryString
    ? queryList.filter(
      item =>
        item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
    : queryList;
  callback(results);
}

const handleClose = () => {
  isShow.value = false;
};

// 更新信息
const onSubmit = async (formEl: FormInstance) => {
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      let saveBlogInfo = {} as AuthorInfoSave;
      const extendsStr = JSON.stringify(blogInfo.extendsParams);
      Object.assign(saveBlogInfo, blogInfo);
      saveBlogInfo.extendsParams = extendsStr;
      const res: Result = await updateAuthorInfo(saveBlogInfo);
      if (res.state === "success") {
        message("设置成功", {type: "success"});
        router.go(-1);
      } else {
        message(res.message, {type: "warning"});
      }
    } else {
      message("参数校验失败！", {type: "warning"});
    }
  });
};

getAuthorInfo().then(res => {
  if (!res) {
    return;
  }
  if (!res.extendsParams) {
    res.extendsParams = {};
  } else {
    res.extendsParams = JSON.parse(res.extendsParams);
  }
  Object.assign(blogInfo, res);
});
</script>

<template>
  <div
    :class="[
      'min-w-[180px]',
      deviceDetection() ? 'max-w-[100%]' : 'max-w-[70%]'
    ]"
  >
    <h3 class="my-8">网站信息</h3>
    <el-form
      ref="userInfoFormRef"
      label-position="top"
      :rules="rules"
      :model="blogInfo"
    >
      <el-form-item label="网站地址" prop="website" maxlength="120">
        <el-input v-model="blogInfo.website" placeholder="请输入网站地址"/>
      </el-form-item>
      <el-form-item label="网站名称" prop="siteName" maxlength="30">
        <el-input v-model="blogInfo.siteName" placeholder="请输入网站名称" maxlength="30"/>
      </el-form-item>
      <el-form-item label="博主昵称" prop="name">
        <el-input v-model="blogInfo.name" placeholder="请输入博主昵称" maxlength="30"/>
      </el-form-item>
      <el-form-item label="博主英文昵称" prop="extends.extendsParams.enName" maxlength="30">
        <el-input v-model="blogInfo.extendsParams.enName" placeholder="请输入博主英文昵称"/>
      </el-form-item>
      <el-form-item label="头像" prop="avatar" maxlength="120">
        <el-input v-model="blogInfo.avatar" placeholder="请输入头像"/>
      </el-form-item>
      <el-form-item label="Github" prop="extends.github" maxlength="120">
        <el-input v-model="blogInfo.extendsParams.github" placeholder="请输入Github地址"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" maxlength="30">
        <el-autocomplete
          v-model="blogInfo.email"
          :fetch-suggestions="queryEmail"
          :trigger-on-focus="false"
          placeholder="请输入邮箱"
          clearable
          class="w-full"
        />
      </el-form-item>
      <el-form-item label="ICP" prop="extends.icp" maxlength="30">
        <el-input v-model="blogInfo.extendsParams.icp" placeholder="请输入备案号"/>
      </el-form-item>
      <el-form-item label="简介">
        <el-input
          v-model="blogInfo.description"
          placeholder="请输入简介"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 5 }"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="公告">
        <el-input
          v-model="blogInfo.extendsParams.announcement"
          placeholder="请输入公告"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 5 }"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="页脚">
        <el-input
          v-model="blogInfo.extendsParams.footer"
          placeholder="请输入页脚"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 5 }"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="文章版权">
        <el-input
          v-model="blogInfo.extendsParams.copyright"
          placeholder="请输入文章版权"
          type="textarea"
          :autosize="{ minRows: 1, maxRows: 5 }"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
      <el-button type="primary" @click="onSubmit(userInfoFormRef)">
        更新信息
      </el-button>
    </el-form>
  </div>
</template>
