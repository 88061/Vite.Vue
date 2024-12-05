export default [
  {
    path: "/404",
    component: () => import("@/not-found//views/index.vue"),
  },
  {
    path: "/:error*",
    redirect: "/404",
  },
];
