<script setup lang="ts">
import VditorEditor from "@/components/VditorEditor/index.vue"
import Info from "@/views/article/edit/info.vue";
import {useArticleStore} from "@/store/article";
import {useVditorStore} from "@/store/vditor";
import {getArticleDetail, saveArticle, updateArticle} from "@/api/article";
import {message} from "@/utils/message";
import type {Article} from "@/types/article";
import {useRouter, useRoute} from 'vue-router';
import {onBeforeUnmount, onMounted} from "vue";
import {storageSession} from "@pureadmin/utils";
import {ElLoading} from "element-plus";

const articleStore = useArticleStore();
const vditorStore = useVditorStore();

const router = useRouter();
const route = useRoute();
const saveTitle = route.path === "/articles/edit" ? "更新文章" : "发布文章";

async function init() {
  if (route.path === "/articles/new") {
    articleStore.initArticle();
  } else {
    const articleId: string = storageSession().getItem("articleId");
    if (!articleId) {
      await router.push({name: "ArticleManage"});
      return;
    }
    const loadingInstance = ElLoading.service({fullscreen: true})
    const newArticle = await getArticleDetail(articleId);
    articleStore.setArticle(newArticle);
    vditorStore.updateContent(articleStore.article.content);
    loadingInstance.close();
  }
}

function saveOrUpdate() {
  if (route.path === "/articles/edit") {
    update();
  } else {
    save();
  }
}

function buildContent() {
  const content = vditorStore.vditor?.getValue();
  const htmlContent = vditorStore.vditor?.getHTML();
  articleStore.setContent(content, htmlContent);
}

async function save() {
  buildContent();
  if (!checkParams(articleStore.article)) {
    return;
  }
  const res = await saveArticle(articleStore.article);
  if (res.state === "success") {
    message("保存成功", {type: "success"});
    await router.push({name: "ArticleManage"});
  }
}

async function update() {
  buildContent();
  if (!checkParams(articleStore.article)) {
    return;
  }
  const res = await updateArticle(articleStore.article);
  if (res.state === "success") {
    message("更新成功", {type: "success"});
    await router.push({name: "ArticleManage"});
  }
}

function checkParams(article: Article, isDraft = false) {
  if (!article.title || !article.content) {
    message("标题和内容不能为空", {type: "error"})
    return false;
  }
  if (!article.type || !article.createdDate || !article.updatedDate) {
    message("必填参数不能为空", {type: "error"})
    return false;
  }
  if (!isDraft && (!article.columnIds || article.columnIds?.length <= 0)) {
    message("专栏不能为空", {type: "error"})
    return false;
  }
  if (article.weight < 1 || article.weight > 99) {
    message("权重值必须在1-99之间", {type: "error"})
    return false;
  }
  return true;
}

async function saveDraft() {
  buildContent();
  articleStore.setIsDraft(true);
  if (!checkParams(articleStore.article, true)) {
    return;
  }
  const res = await saveArticle(articleStore.article);
  if (res.state === "success") {
    message("保存成功", {type: "success"});
    await router.push({name: "ArticleManage"});
  }
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  storageSession().setItem("articleId", "");
})
</script>

<template>
  <div class="flex wide:flex-row flex-col">
    <div class="w-full">
      <el-card shadow="never">
        <div class="flex flex-col h-full w-full">
          <div class="flex items-center my-2">
            <el-input required class="mr-2" v-model="articleStore.article.title" placeholder="输入文章标题"
                      size="large"/>
            <el-button type="primary" plain size="large" @click="saveDraft">存为草稿</el-button>
            <el-button type="primary" size="large" @click="saveOrUpdate">{{ saveTitle }}</el-button>
          </div>
          <VditorEditor/>
        </div>
      </el-card>
    </div>
    <div class="wide:ml-3 wide:w-2/5 w-full ml-0">
      <Info/>
    </div>
  </div>
</template>
