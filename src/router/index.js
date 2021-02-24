import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  {
    // 主页 =>默认在男生页面
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "male",
        name: "male",
      },
      {
        path: "female",
        name: "female",
      },
    ],
  },

  {
    // 分类
    // path: "/category:id",
    path: "/category",
    name: "Category",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Category.vue"),
  },
  {
    // 分类详情
    // path: "/category:id",
    // path: "/categorydetail/:cateID",
    path: "/categorydetail",
    name: "CategoryDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CategoryDetail.vue"),
  },
  {
    // 排行榜
    path: "/ranking",
    name: "Ranking",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Ranking.vue"),
    // children: [
    //   {
    //     path: "/rankingdetail",
    //     name: "RankingDetail",
    //     component: () =>
    //       import(/* webpackChunkName: "about" */ "../views/RankingDetail.vue"),
    //   },
    // ],
  },
  {
    // 排行榜单页
    // path: "/rankingdetail/:rankid",
    path: "/rankingdetail",
    name: "RankingDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/RankingDetail.vue"),
  },
  {
    // 书架
    path: "/bookshelf",
    name: "Bookshelf",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Bookshelf.vue"),
    // redirect: "/bookshelf/my",
    children: [
      {
        path: "/bookshelf/my",
        name: "My",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/My.vue"),
      },
      {
        // path: "/bookshelf/history",
        path: "history",
        name: "History",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/History.vue"),
      },
    ],
  },
  {
    // Vip
    path: "/vip",
    name: "Vip",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Vip.vue"),
  },
  {
    // Finish
    path: "/finish",
    name: "Finish",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Finish.vue"),
  },
  {
    // User
    path: "/user",
    name: "User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/User.vue"),
  },
  {
    // Free
    path: "/free",
    name: "Free",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Free.vue"),
  },
  {
    // 书籍详情
    path: "/book/:id",
    name: "BookDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BookDetail.vue"),
    children: [
      {
        path: "/",
        name: "Book",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Book.vue"),
      },
      {
        path: "chapter",
        name: "Chapter",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Chapter.vue"),
      },
      {
        path: "read",
        name: "Read",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Read.vue"),
      },
    ],
  },
  {
    // Search
    path: "/search",
    name: "Search",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Search.vue"),
  },
  {
    // 搜索结果
    path: "/search-value",
    name: "SearchResult",
    component: () => import("../views/SearchResult.vue"),
  },
];

const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  // const tokensign = window.sessionStorage.getItm("token");
  //to.path 目标路由
  //next 必须有否则程序不会继续执行
  // if (to.path !== "/login" && !tokensign) {
  // return next("/login");
  // }
  // console.log(to,from);
  to, from;
  next();
});

export default router;
