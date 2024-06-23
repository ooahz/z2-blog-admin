<script setup lang="ts">
import {ref} from "vue";
import {formRules} from "./utils/rule";
import type {FriendFormProps} from "@/types/friend";

const props = withDefaults(defineProps<FriendFormProps>(), {
  friendForm: () => ({
    id: "",
    name: ""
  })
});

const statusOptions = [
  {
    label: "不可见",
    value: 0
  },
  {
    label: "正常",
    value: 1
  },
  {
    label: "审核中",
    value: 2
  }
];

const typeOptions = [
  {
    label: "默认",
    value: 1
  },
  {
    label: "技术",
    value: 2
  },
  {
    label: "生活",
    value: 3
  }
];

const ruleFormRef = ref();
const newFriendForm = ref(props.friendForm);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFriendForm"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="友链名称" prop="name">
      <el-input
        v-model="newFriendForm.name"
        clearable
        maxlength="50"
        placeholder="请输入友链名称"
      />
    </el-form-item>
    <el-form-item label="友链地址" prop="website">
      <el-input
        v-model="newFriendForm.website"
        clearable
        maxlength="128"
        placeholder="请输入完整的友链地址"
      />
    </el-form-item>
    <el-form-item label="友链头像" prop="avatar">
      <el-input
        v-model="newFriendForm.avatar"
        clearable
        placeholder="请输入友链头像"
      />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select
        v-model="newFriendForm.type"
        placeholder="请选择类型"
      >
        <el-option v-for="item in typeOptions" :label="item.label" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-select
        v-model="newFriendForm.status"
        placeholder="请选择状态"
      >
        <el-option v-for="item in statusOptions" :label="item.label" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="权重" prop="weight">
      <el-input-number class="article-param-item"
                       v-model="newFriendForm.weight" :min="1" :max="999"/>
    </el-form-item>
    <el-form-item label="简介" props="description">
      <el-input
        v-model="newFriendForm.description"
        placeholder="请输入简介"
        type="textarea"
      />
    </el-form-item>

  </el-form>
</template>
