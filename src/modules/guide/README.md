##### locales

模块内的国际化资源, 使用时要带上模块前缀

```javascript
`$t(guide.key)`;
`$t(guide.object.key)`;
```

##### store

```javascript
import { useGuideStore } from "@/guide/store";
```

##### service

```javascript
import { ... } from "@/guide/service";
```

##### route

```javascript
export default [
  {
    meta: {
      ... // 路由元信息
     },
    path: "/guide",
    component: () => import("@/guide/views/index.vue"),
  },
];
```
