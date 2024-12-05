/**
 * @router
 * @README 通过 import.meta.glob 同步读取所有路由文件, 生成路由表, 挂载在 app 下
 * @Redevelopment 根据业务需求可通过 router 动态挂载路由
 */
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";

const importRoutes = () => {
  const modules = import.meta.glob("./modules/*/route.ts", {
    eager: true,
    import: "default",
  });

  return Object.values(modules).flat() as RouteRecordRaw[];
};

export const router = createRouter({
  history: createWebHashHistory(),
  routes: importRoutes(),
});

router.beforeEach((to, from, next) => {
  console.info(to, from, "beforeEach");
  next();
});
