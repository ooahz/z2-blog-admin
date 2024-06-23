import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  name: [{ required: true, message: "友链名称为必填项", trigger: "blur" }],
  website: [{ required: true, message: "友链地址为必填项", trigger: "blur" }],
});
