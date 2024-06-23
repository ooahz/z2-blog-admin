import editForm from "../form.vue";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog";
import type {PaginationProps} from "@pureadmin/table";
import {deviceDetection} from "@pureadmin/utils";
import {h, onMounted, reactive, ref} from "vue";
import type {Category} from "@/types/category";
import {deleteCategory, listCategory, saveCategory, updateCategory} from "@/api/category";
import type {Result, ResultList} from "@/types/result";

export function useCategory() {
  const formRef = ref();
  const dataList = ref([]);
  const isShow = ref(false);
  const loading = ref(true);

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "分类名称",
      prop: "name",
      minWidth: 160
    },
    {
      label: "操作",
      fixed: "right",
      width: 150,
      slot: "operation"
    }
  ];

  async function handleDelete(row) {
    const res = await deleteCategory(row.id);
    if (res.state === "success") {
      message("已删除", {type: "success"});
      getCategoryList(1);
    }
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    if (val <= 1) {
      return;
    }
    getCategoryList(val);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function getCategoryList(pageNum: number) {
    loading.value = true;
    const params = {
      p: pageNum
    }
    const data: ResultList<Category> = await listCategory(params);
    dataList.value = data.data;
    pagination.total = Number.parseInt(data.page.total);
    pagination.pageSize = data.page.size;
    pagination.currentPage = data.page.pagination;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    getCategoryList(1);
  };

  function openDialog(title = "新增", row?: Category) {
    addDialog({
      title: `${title}分类`,
      props: {
        categoryForm: {
          id: row?.id ?? "",
          name: row?.name ?? "",
        }
      },
      width: "40%",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.categoryForm as Category;

        function chores(res: Result<any>) {
          done(); // 关闭弹框
          if (res.state === "success") {
            message(`已${title}`, {
              type: "success"
            });
            getCategoryList(1); // 刷新表格数据
          }
        }

        FormRef.validate(async valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              const res = await saveCategory(curData);
              chores(res);
            } else {
              const res = await updateCategory(curData);
              chores(res);
            }
          }
        });
      }
    });
  }

  onMounted(async () => {
    getCategoryList(1);
  });

  return {
    isShow,
    loading,
    columns,
    dataList,
    pagination,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
