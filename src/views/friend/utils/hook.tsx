import editForm from "../form.vue";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog";
import type {PaginationProps} from "@pureadmin/table";
import {deviceDetection} from "@pureadmin/utils";
import {h, onMounted, reactive, ref} from "vue";
import type {Friend} from "@/types/friend";
import {deleteFriend, listFriend, saveFriend, updateFriend} from "@/api/friend";
import type {Result, ResultList} from "@/types/result";

export function useFriend() {
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
      label: "名称",
      prop: "name",
      minWidth: 160
    },
    {
      label: "网址",
      prop: "website",
      minWidth: 160
    },
    {
      label: "类型",
      prop: "type",
      cellRenderer: scope => {
        const elTag1 = <el-tag type="primary">默认</el-tag>
        const elTag2 = <el-tag type="primary">技术</el-tag>
        const elTag3 = <el-tag type="primary">生活</el-tag>
        if (scope.row.type == "2") {
          return elTag2;
        }
        if (scope.row.type == "3") {
          return elTag3;
        }
        return elTag1;
      },
    },
    {
      label: "状态",
      prop: "status",
      cellRenderer: scope => {
        const elTag0 = <el-tag type="danger">不可见</el-tag>
        const elTag1 = <el-tag type="primary">正常</el-tag>
        const elTag2 = <el-tag type="warning">审核中</el-tag>
        if (scope.row.status == "0") {
          return elTag0;
        }
        if (scope.row.status == "1") {
          return elTag1;
        }
        return elTag2;
      },
    },
    {
      label: "简介",
      prop: "description",
      minWidth: 160
    },
    {
      label: "权重",
      prop: "weight",
      sortable: true
    },
    {
      label: "操作",
      fixed: "right",
      width: 150,
      slot: "operation"
    }
  ];

  async function handleDelete(row) {
    const res = await deleteFriend(row.id);
    if (res.state === "success") {
      message("已删除", {type: "success"});
      getFriendList(1);
    }
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    if (val < 1) {
      return;
    }
    getFriendList(val);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function getFriendList(pageNum: number) {
    loading.value = true;
    const params = {
      p: pageNum
    }
    const data: ResultList<Friend> = await listFriend(params);
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
    getFriendList(1);
  };

  function openDialog(title = "新增", row?: Friend) {
    addDialog({
      title: `${title}友链`,
      props: {
        friendForm: {
          id: row?.id ?? "",
          name: row?.name ?? "",
          website: row?.website ?? "",
          avatar: row?.avatar ?? "",
          description: row?.description ?? "",
          status: row?.status ?? "",
          type: row?.type ?? "",
          weight: row?.weight ?? 0
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
        const curData = options.props.friendForm as Friend;

        function chores(res: Result<any>) {
          done(); // 关闭弹框
          if (res.state === "success") {
            message(`已${title}`, {
              type: "success"
            });
            getFriendList(1); // 刷新表格数据
          }
        }

        FormRef.validate(async valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              const res = await saveFriend(curData);
              chores(res);
            } else {
              const res = await updateFriend(curData);
              chores(res);
            }
          }
        });
      }
    });
  }

  onMounted(async () => {
    getFriendList(1);
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
