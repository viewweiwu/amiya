---
order: 1
---

## 创建配置文件

请在项目里面添 `/amiya/config.tsx` 文件

```diff
├── package.json
├── .umirc.ts
├── .env
├── dist
├── mock
├── public
└── src
    ├── .umi
    ├── layouts/index.tsx
    ├── pages
        ├── index.less
        └── index.tsx
+   ├── amiya
+       ├── config.tsx
    └── app.tsx
```

然后在 `app.tsx` 里面引入 amiya 全局配置

```js
import './amiya/config.tsx'
```
