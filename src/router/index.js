import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首页", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/product",
    component: Layout,
    name: "Product",
    meta: { title: "商品管理", icon: "el-icon-goods" },
    children: [
      {
        path: "trademark",
        name: "TradeMark",
        component: () => import("@/views/product/tradeMark"),
        meta: { title: "品牌管理" },
      },
      {
        path: "attr",
        name: "Attr",
        component: () => import("@/views/product/Attr"),
        meta: { title: "平台属性管理" },
      },
      {
        path: "spu",
        name: "Spu",
        component: () => import("@/views/product/spu"),
        meta: { title: "spu" },
      },
      {
        path: "sku",
        name: "Sku",
        component: () => import("@/views/product/sku"),
        meta: { title: "sku" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();


export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
