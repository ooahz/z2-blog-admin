import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "专栏名称为必填项", trigger: "blur" }],
  categoryIds: [{ required: true, message: "分类为必填项", trigger: "blur" }],
});
