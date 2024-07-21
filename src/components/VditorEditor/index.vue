<script setup lang="ts">
import "vditor/dist/index.css";
import "@/assets/css/vditor/index.css";
import {onMounted} from "vue";
import {vditorInit} from "./index";

onMounted(() => {
  vditorInit()
});
</script>

<template>
  <div id="ahzoo-editor"/>
</template>

<style lang="scss">
#ahzoo-editor {
  width: 100% !important;
  height: 100% !important;
  overflow: auto;
}
</style>
