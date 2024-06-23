<script setup lang="ts">
import {ref} from "vue";
import {formRules} from "./utils/rule";
import type {ColumnFormProps} from "@/types/column";
import {useColumn} from "@/views/column/utils/hook";

const props = withDefaults(defineProps<ColumnFormProps>(), {
  columnForm: () => ({
    id: "",
    name: "",
    description: "",
    style: "",
    thumbnail: "",
    categoryList: [],
    categoryIds: []
  })
});

const ruleFormRef = ref();
const newColumnForm = ref(props.columnForm);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef});

const {
  categoryList
} = useColumn();
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newColumnForm"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="专栏名称" prop="name">
      <el-input
        v-model="newColumnForm.name"
        clearable
        placeholder="请输入专栏名称"
      />
    </el-form-item>

    <el-form-item label="缩略图" prop="thumbnail">
      <el-input
        v-model="newColumnForm.thumbnail"
        clearable
        placeholder="请输入专栏缩略图地址"
      />
    </el-form-item>

    <el-form-item label="背景样式" prop="style">
      <el-input
        v-model="newColumnForm.style"
        clearable
        placeholder="请输入专栏背景样式"
      />
    </el-form-item>
    <el-form-item label="分类" prop="categoryIds">
      <el-select
        v-model="newColumnForm.categoryIds"
        placeholder="请选择分类"
        multiple
      >
        <el-option v-for="item in categoryList" :label="item.name" :value="item.id"/>
      </el-select>
    </el-form-item>

    <el-form-item label="简介" props="description">
      <el-input
        v-model="newColumnForm.description"
        placeholder="请输入简介"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>
