<script setup lang="ts">
import {useRouter} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {ReText} from "@/components/ReText";
import Profile from "./components/Profile.vue";
import {deviceDetection, storageLocal, useGlobal} from "@pureadmin/utils";
import TopCollapse from "@/layout/components/sidebar/topCollapse.vue";
import {useDataThemeChange} from "@/layout/hooks/useDataThemeChange";
import leftLine from "@iconify-icons/ri/arrow-left-s-line";
import ProfileIcon from "@iconify-icons/ri/user-3-line";
import {UserInfo} from "@/types/user";
import {userKey} from "@/utils/auth";
import userAvatar from "@/assets/user.webp";

defineOptions({
  name: "AccountSettings"
});
const userInfo: UserInfo = storageLocal().getItem(userKey)
const router = useRouter();
const isOpen = ref(deviceDetection() ? false : true);
const {$storage} = useGlobal<GlobalPropertiesApi>();
onBeforeMount(() => {
  useDataThemeChange().dataThemeChange($storage.layout?.overallStyle);
});

const panes = [
  {
    key: "profile",
    label: "重置密码",
    icon: ProfileIcon,
    component: Profile
  }
];

const witchPane = ref("profile");
</script>

<template>
  <el-container class="h-full">
    <el-aside
      v-if="isOpen"
      class="pure-account-settings overflow-hidden px-2 dark:!bg-[var(--el-bg-color)] border-r-[1px] border-[var(--pure-border-color)]"
      :width="deviceDetection() ? '180px' : '240px'"
    >
      <el-menu :default-active="witchPane" class="pure-account-settings-menu">
        <el-menu-item
          class="hover:!transition-all hover:!duration-200 hover:!text-base !h-[50px]"
          @click="router.go(-1)"
        >
          <div class="flex items-center">
            <IconifyIconOffline :icon="leftLine"/>
            <span class="ml-2">返回</span>
          </div>
        </el-menu-item>
        <div class="flex items-center ml-8 mt-4 mb-4">
          <el-avatar :size="48" :src="userAvatar"/>
          <div class="ml-4 flex flex-col max-w-[130px]">
            <ReText class="font-bold !self-baseline">
              {{ userInfo.name }}
            </ReText>
            <!--            <ReText class="!self-baseline" type="info">-->
            <!--              {{ userInfo.role }}-->
            <!--            </ReText>-->
          </div>
        </div>
        <el-menu-item
          v-for="item in panes"
          :key="item.key"
          :index="item.key"
          @click="
            () => {
              witchPane = item.key;
              if (deviceDetection()) {
                isOpen = !isOpen;
              }
            }
          "
        >
          <div class="flex items-center z-10">
            <el-icon>
              <IconifyIconOffline :icon="item.icon"/>
            </el-icon>
            <span>{{ item.label }}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <TopCollapse
        v-if="deviceDetection()"
        class="px-0"
        :is-active="isOpen"
        @toggleClick="isOpen = !isOpen"
      />
      <component
        :is="panes.find(item => item.key === witchPane).component"
        :class="[!deviceDetection() && 'ml-[120px]']"
      />
    </el-main>
  </el-container>
</template>

<style lang="scss">
.pure-account-settings {
  background: $menuBg;
}

.pure-account-settings-menu {
  background-color: transparent;
  border: none;

  .el-menu-item {
    height: 48px !important;
    color: $menuText;
    background-color: transparent !important;
    transition: color 0.2s;

    &:hover {
      color: $menuTitleHover !important;
    }

    &.is-active {
      color: #fff !important;

      &:hover {
        color: #fff !important;
      }

      &::before {
        position: absolute;
        inset: 0 8px;
        margin: 4px 0;
        clear: both;
        content: "";
        background: var(--el-color-primary);
        border-radius: 3px;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
body[layout] {
  .el-menu--vertical .is-active {
    color: #fff !important;
    transition: color 0.2s;

    &:hover {
      color: #fff !important;
    }
  }
}
</style>
