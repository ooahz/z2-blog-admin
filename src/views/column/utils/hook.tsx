import editForm from "../form.vue";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog";
import type {PaginationProps} from "@pureadmin/table";
import {deviceDetection} from "@pureadmin/utils";
import {h, onMounted, reactive, ref, toRaw} from "vue";
import type {Column} from "@/types/column";
import type {Category} from "@/types/category";
import {deleteColumn, listColumn, saveColumn, updateColumn} from "@/api/column";
import type {Result, ResultList} from "@/types/result";
import {listCategory} from "@/api/category";

export function useColumn() {
  const searchColumn = ref<Column>({
    id: "",
    name: "",
    description: "",
    style: "",
    thumbnail: "",
    categoryList: [],
    categoryIds: []
  });
  const category = ref<String>();
  const categoryList = ref<Category[]>();
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
      label: "专栏名称",
      prop: "name",
      minWidth: 160
    },
    {
      label: "专栏简介",
      prop: "description",
      minWidth: 200
    },
    {
      label: "操作",
      fixed: "right",
      width: 150,
      slot: "operation"
    }
  ];

  async function handleDelete(row) {
    const res = await deleteColumn(row.id);
    if (res.state === "success") {
      message("已删除", {type: "success"});
      getColumnList(1);
    }
  }

  function handleSizeChange(val: number) {
    if (val <= 1) {
      return;
    }
    getColumnList(val);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function getColumnList(pageNum: number) {
    loading.value = true;
    const params = {
      p: pageNum
    }
    const data: ResultList<Column> = await listColumn(params);
    dataList.value = data.data;
    pagination.total = Number.parseInt(data.page.total);
    pagination.pageSize = data.page.size;
    pagination.currentPage = data.page.pagination;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function onFilter(pageNum: number) {
    loading.value = true;
    const params = {
      p: pageNum,
      categoryId: category.value
    }
    const data: ResultList<Column> = await listColumn(params);
    dataList.value = data.data;
    pagination.total = Number.parseInt(data.page.total);
    pagination.pageSize = data.page.size;
    pagination.currentPage = data.page.pagination;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function getCategoryList() {
    const data: ResultList<Category> = await listCategory();
    categoryList.value = data.data;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    getColumnList(1);
  };

  function openDialog(title = "新增", row?: Column) {
    if (row) {
      row.categoryIds = [];
      row?.categoryList?.forEach((item) => {
        row.categoryIds.push(item.id)
      })
    }
    addDialog({
      title: `${title}专栏`,
      props: {
        columnForm: {
          id: row?.id ?? "",
          name: row?.name ?? "",
          description: row?.description ?? "",
          style: row?.style ?? "",
          thumbnail: row?.thumbnail ?? "",
          categoryList: row?.categoryList ?? [],
          categoryIds: row?.categoryIds ?? []
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
        const curData = options.props.columnForm as Column;

        function chores(res: Result<any>) {
          done(); // 关闭弹框
          if (res.state === "success") {
            message(`已${title}`, {
              type: "success"
            });
            getColumnList(1); // 刷新表格数据
          }
        }

        FormRef.validate(async valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              const res = await saveColumn(curData);
              chores(res);
            } else {
              const res = await updateColumn(curData);
              chores(res);
            }
          }
        });
      }
    });
  }

  onMounted(async () => {
    getColumnList(1);
    getCategoryList();
  });

  return {
    searchColumn,
    category,
    categoryList,
    isShow,
    loading,
    columns,
    dataList,
    pagination,
    onFilter,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
