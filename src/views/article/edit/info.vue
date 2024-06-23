<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useArticleStore} from "@/store/article";
import type {Column} from "@/types/column";
import {listAllColumn} from "@/api/column";

const articleStore = useArticleStore();
const columnList = ref<Column[]>([])

async function getColumnList(pagination: number) {
  const params = {
    p: pagination
  }
  columnList.value = await listAllColumn();
}

onMounted(() => {
  getColumnList(1);
});
</script>

<template>
  <el-card shadow="never">
    <div class="article-param mb-11">
      <div class="article-param-item">
        <span class="label">文章简介：</span>
        <el-input v-model="articleStore.article.description" placeholder="文章简介" type="textarea"/>
      </div>
      <div class="article-param-item">
        <span class="label">文章封面：</span>
        <el-input
          v-model="articleStore.article.thumbnail"
          placeholder="文章封面地址"
        >
          <template #append>
            预览
          </template>
        </el-input>
      </div>
      <div class="article-param-item">
        <span class="label">文章背景样式：</span>
        <el-input v-model="articleStore.article.style" placeholder="文章背景样式"/>
      </div>
      <div class="article-param-item">
        <span class="label">文章路径：</span>
        <el-input v-model="articleStore.article.path" placeholder="文章路径"/>
      </div>
      <div class="article-param-item">
        <span class="label required">创建时间：</span>
        <el-date-picker
          v-model="articleStore.article.createdDate"
          type="datetime" placeholder="创建时间"
          format="YYYY/MM/DD HH:mm" date-format="MMM DD, YYYY" time-format="HH:mm"
        />
      </div>
      <div class="article-param-item">
        <span class="label required">更新时间：</span>
        <el-date-picker
          v-model="articleStore.article.updatedDate"
          type="datetime" placeholder="更新时间"
          format="YYYY/MM/DD HH:mm" date-format="MMM DD, YYYY" time-format="HH:mm"
        />
      </div>

      <div class="article-param-item">
        <span class="label required">文章专栏：</span>
        <el-select
          class="article-param-item"
          v-model="articleStore.article.columnIds" placeholder="选择文章专栏"
          multiple>
          <el-option
            v-for="item in columnList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>

      <div class="article-param-item">
        <span class="label">文章权重：</span>
        <el-input-number class="article-param-item"
                         v-model="articleStore.article.weight" :min="1" :max="99"/>
      </div>
      <div class="article-param-item">
        <span class="label required">类型：</span>
        <el-radio-group v-model="articleStore.article.type" class="ml-4">
          <el-radio :value=1>原创</el-radio>
          <el-radio :value=2>转载</el-radio>
        </el-radio-group>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss">
.article-param {
  min-width: 230px;
  font-size: 14px;

  &-item {
    display: block;
    margin: 7px 0;
    width: 100%;

    .label {
      white-space: nowrap;
      font-weight: 600;

      &.required {
        &::before {
          content: "*";
          color: var(--el-color-danger);
        }
      }
    }
  }

}

</style>
