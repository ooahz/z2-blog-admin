<script setup lang="ts">
import ReCol from "@/components/ReCol";
import {useDark} from "./utils";
import {ReNormalCountTo} from "@/components/ReCountTo";
import ColumnIcon from "@iconify-icons/ri/layout-column-line";
import ArticleIcon from "@iconify-icons/ri/article-fill";
import ViewIcon from "@iconify-icons/ri/fire-fill";
import {onMounted, ref} from "vue";
import {homeStatistics} from "@/api/statistics";
import {HomeStatistics} from "@/types/statistics";

const {isDark} = useDark();
const statisticsData = ref<HomeStatistics>();

async function statisticsInit() {
  const newStatistics = await homeStatistics();
  statisticsData.value = newStatistics;
}

onMounted(() => {
  statisticsInit();
});
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <re-col class="mb-[18px]" :value="6" :md="12" :sm="12" :xs="24">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              文章统计
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{backgroundColor: isDark ? 'transparent' : '#effaff'}">
              <IconifyIconOffline :icon="ArticleIcon" color="#41b6ff" width="18"/>
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div>
              发布：
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.articles?.publish"/>
              <span class="ml-3">总数：</span>
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.articles?.total"/>
            </div>
          </div>
        </el-card>
      </re-col>
      <re-col class="mb-[18px]" :value="6" :md="12" :sm="12" :xs="24">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              专栏统计
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{backgroundColor: isDark ? 'transparent' : '#f6f4fe'}">
              <IconifyIconOffline :icon="ColumnIcon" color="#7846e5" width="18"/>
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div>
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.columnsTotal"/>
            </div>
          </div>
        </el-card>
      </re-col>
      <re-col class="mb-[18px]" :value="6" :md="12" :sm="12" :xs="24">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              今日访客
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{backgroundColor: isDark ? 'transparent' : '#f8eff5'}">
              <IconifyIconOffline :icon="ViewIcon" color="#ce2648" width="18"/>
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div>
              UV：
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.views?.uv"/>
              <span class="ml-3">PV：</span>
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.views?.pv"/>
            </div>
          </div>
        </el-card>
      </re-col>
      <re-col class="mb-[18px]" :value="6" :md="12" :sm="12" :xs="24">
        <el-card class="line-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">
              总访客数（截至昨日）
            </span>
            <div
              class="w-8 h-8 flex justify-center items-center rounded-md"
              :style="{backgroundColor: isDark ? 'transparent' : '#fff5f4'}">
              <IconifyIconOffline :icon="ViewIcon" color="#e85f33" width="18"/>
            </div>
          </div>
          <div class="flex justify-between items-start mt-3">
            <div>
              UV：
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.yesterdayViews.uv"/>
              <span class="ml-3">PV：</span>
              <ReNormalCountTo :fontSize="'1.6em'"
                               :endVal="statisticsData?.yesterdayViews.pv"/>
            </div>
          </div>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-border-color: none;

  /* 解决概率进度条宽度 */
  .el-progress--line {
    width: 85%;
  }

  /* 解决概率进度条字体大小 */
  .el-progress-bar__innerText {
    font-size: 15px;
  }

  /* 隐藏 el-scrollbar 滚动条 */
  .el-scrollbar__bar {
    display: none;
  }

  /* el-timeline 每一项上下、左右边距 */
  .el-timeline-item {
    margin: 0 6px;
  }
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
