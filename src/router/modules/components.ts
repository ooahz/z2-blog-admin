export default {
  path: "/components",
  redirect: "/components/icon-select",
  meta: {
    icon: "ep:menu",
    title: "组件",
    rank: 8
  },
  children: [
    {
      path: "/components/icon-select",
      name: "IconSelect",
      component: () => import("@/views/components/icon-select.vue"),
      meta: {
        title: "图标选择"
      }
    }
  ]
} satisfies RouteConfigsTable;
