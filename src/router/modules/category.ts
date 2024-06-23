
export default [{
  path: "/categories",
  name: "分类管理",
  component: () => import("@/views/category/index.vue"),
  meta: {
    icon: "ri:archive-drawer-fill",
    title: "分类管理",
    rank: 3
  }
}] satisfies Array<RouteConfigsTable>;
