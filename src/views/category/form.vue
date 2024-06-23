<script setup lang="ts">
import {ref} from "vue";
import {formRules} from "./utils/rule";
import type {CategoryFormProps} from "@/types/category";

const props = withDefaults(defineProps<CategoryFormProps>(), {
  categoryForm: () => ({
    id: "",
    name: ""
  })
});

const ruleFormRef = ref();
const newCategoryForm = ref(props.categoryForm);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newCategoryForm"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="分类名称" prop="name">
      <el-input
        v-model="newCategoryForm.name"
        clearable
        placeholder="请输入分类名称"
      />
    </el-form-item>
  </el-form>
</template>
