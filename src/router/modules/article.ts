
export default {
  path: "/",
  redirect: "/articles",
  meta: {
    icon: "ri:article-fill",
    title: "文章管理",
    rank: 2
  },
  children: [
    {
      path: "/articles",
      name: "ArticleManage",
      component: () => import("@/views/article/manage/index.vue"),
      meta: {
        title: "文章管理"
      }
    },
    {
      path: "/articles/new",
      name: "ArticleNew",
      component: () => import("@/views/article/edit/index.vue"),
      meta: {
        title: "文章发布"
      }
    },
    {
      path: "/articles/edit",
      name: "ArticleEdit",
      component: () => import("@/views/article/edit/index.vue"),
      meta: {
        title: "编辑文章",
        showLink: false,
      }
    },
  ]
} satisfies RouteConfigsTable;
