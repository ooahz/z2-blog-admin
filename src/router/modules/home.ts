const { VITE_HIDE_HOME } = import.meta.env;
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Home",
  component: Layout,
  redirect: "/articles",
  meta: {
    icon: "ri:article-fill",
    title: "文章管理",
    rank: 0
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
