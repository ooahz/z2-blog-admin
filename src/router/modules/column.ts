
export default [{
  path: "/columns",
  name: "专栏管理",
  component: () => import("@/views/column/index.vue"),
  meta: {
    icon: "ri:book-2-fill",
    title: "专栏管理",
    rank: 4
  }
}] satisfies Array<RouteConfigsTable>;
