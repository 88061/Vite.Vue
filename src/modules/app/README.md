##### what

其他模块的父节点，可以用来做页面布局，类似与全局 global 的角色 <br/>
所以 组件内应该是布局相关的组件，store 应是全局的状态，service 应是全局的接口 如获取用户信息等<br/>

##### app path

@/app

##### app views

页面

##### app components

模块组件

##### app locales

全局的国际化资源，如操作，保存，取消，删除等等<br/>
做了特殊处理，可以直接使用，无需前缀 app

```javascript
`$t(key)`;
`$t(object.key)`;
```

##### app images

模块图片资源

##### app store

```javascript
import { useAppStore } from "@/app/store";
```

##### app service

```javascript
import { getUserInfo } from "@/app/service";
```

##### app route

```javascript
export default [
  {
    path: "/",
    redirect: "/guide",
  },
];
```
