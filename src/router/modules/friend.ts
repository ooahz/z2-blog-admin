
export default [{
  path: "/friends",
  name: "友链管理",
  component: () => import("@/views/friend/index.vue"),
  meta: {
    icon: "ri:group-fill",
    title: "友链管理",
    rank: 5
  }
}] satisfies Array<RouteConfigsTable>;
