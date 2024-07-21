import dayjs from "dayjs";
import {message} from "@/utils/message";
import {ElMessageBox} from "element-plus";
import {usePublicHooks} from "./hooks";
import type {PaginationProps} from "@pureadmin/table";
import {onMounted, reactive, ref, type Ref, toRaw, watch} from "vue";
import {deleteArticle, listArticle, updateArticlePart} from "@/api/article";
import router from "@/router";
import type {Article, ArticleItem} from "@/types/article";
import {ResultList} from "@/types/result";
import {listAllColumn} from "@/api/column";
import {searchByKeyword} from "@/api/search";
import {Column} from "@/types/column";
import {storageSession} from "@pureadmin/utils";

export function useArticle(treeRef: Ref) {
  const searchArticle = reactive<ArticleItem>({} as ArticleItem);
  const dataList = ref([]);
  const columnList = ref<Column[]>([]);
  const column = ref<string>();
  const treeIds = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const switchLoadMap = ref({});
  const isSelectAll = ref(false);
  const {switchStyle} = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const columns: TableColumnList = [
    {
      label: "标题",
      prop: "title",
      minWidth: 160,
    },
    {
      label: "类型",
      prop: "type",
      cellRenderer: scope => {
        const elTag1 = <el-tag type="primary">原创</el-tag>
        const elTag2 = <el-tag type="warning">转载</el-tag>
        return scope.row.type == "2" ? elTag2 : elTag1;
      },
    },
    {
      label: "权重",
      prop: "weight",
      sortable: true
    },
    {
      label: "状态",
      cellRenderer: scope => {
        const elSwitch = <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.status}
          active-value={1}
          inactive-value={0}
          active-text="显示"
          inactive-text="隐藏"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />;
        const elTag = <el-tag type="info">草稿</el-tag>
        return scope.row.status == "3" ? elTag : elSwitch;
      },
      minWidth: 90
    },
    {
      label: "更新时间",
      prop: "updatedDate",
      sortable: true,
      minWidth: 100,
      formatter: ({updatedDate}) =>
        dayjs(updatedDate).format("YYYY-MM-DD HH:mm")
    },
    {
      label: "创建时间",
      prop: "createdDate",
      sortable: true,
      minWidth: 100,
      formatter: ({createdDate}) =>
        dayjs(createdDate).format("YYYY-MM-DD HH:mm")
    },
    {
      label: "操作",
      fixed: "right",
      width: 150,
      slot: "operation"
    }
  ];

  async function onChange({row, index}) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.status === 1 ? "显示" : "隐藏"
      }</strong>该文章吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        const res = await updateArticlePart(row)
        setTimeout(() => {
          switchLoadMap.value[index] = Object.assign(
            {},
            switchLoadMap.value[index],
            {
              loading: false
            }
          );
          if (res.state === "success") {
            message(`已${row.status === 0 ? "隐藏" : "显示"}该文章`, {
              type: "success"
            });
          } else {
            row.status === 0 ? (row.status = 1) : (row.status = 0)
          }
        }, 300);
      })
      .catch(() => {
        row.status === 0 ? (row.status = 1) : (row.status = 0);
      });
  }

  async function handleDelete(row) {
    const res = await deleteArticle(row.id)
    if (res.state === "success") {
      message(`删除成功`, {type: "success"});
      getArticleList(1);
    }
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    if (val < 1) {
      return;
    }
    getArticleList(val);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function getArticleList(pageNum: number) {
    loading.value = true;
    const params = {
      p: pageNum
    }
    const data: ResultList<Article> = await listArticle(params);
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
    const rawArticle = toRaw(searchArticle);
    const params = {
      p: pageNum,
      ...rawArticle,
      columnId: column.value
    }
    const data: ResultList<Article> = await listArticle(params);
    dataList.value = data.data;
    pagination.total = Number.parseInt(data.page.total);
    pagination.pageSize = data.page.size;
    pagination.currentPage = data.page.pagination;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function onSearch(pageNum: number) {
    loading.value = true;
    const params = {
      p: pageNum,
      k: searchArticle.keyword
    }
    const data: ResultList<Article> = await searchByKeyword(params);
    dataList.value = data.data;
    // pagination.total = Number.parseInt(data.page.total);
    // pagination.pageSize = data.page.size;
    // pagination.currentPage = data.page.pagination;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }


  function goEdit(item: Article) {
    storageSession().setItem("articleId", item.id);
    router.push("articles/edit");
  }

  function goNew() {
    storageSession().setItem("articleId", "");
    router.push("articles/new");
  }

  const resetForm = formEl => {
    if (!formEl) return;
    column.value = "";
    formEl.resetFields();
    getArticleList(1);
  };

  onMounted(() => {
    getArticleList(1);
    listAllColumn().then(res => {
      columnList.value = res;
    })
  });

  watch(isSelectAll, val => {
    val
      ? treeRef.value.setCheckedKeys(treeIds.value)
      : treeRef.value.setCheckedKeys([]);
  });

  return {
    searchArticle,
    columnList,
    column,
    isShow,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    onFilter,
    goEdit,
    goNew,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
