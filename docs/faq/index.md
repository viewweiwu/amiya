# FAQ

## 为什么组件没有样式?

amiya 除了携带自己少量的样式外，并不会打包 antd 的样式，所以有可能会缺少 antd 组件的样式，可以在全局对应样式即可。

解决方法一：

```css
// 引入全部样式
import 'antd/dist/antd.css';
import 'amiya/lib/style/index.css';
```

解决方法二：

```css
// 引入局部样式，缺少哪个引入哪个
import 'antd/es/popover/style/index.less';
import 'antd/es/popconfirm/style/index.less';
import 'antd/es/form/style/index.less';
import 'antd/es/divider/style/index.less';
import 'antd/es/drawer/style/index.less';
import 'antd/es/avatar/style/index.less';
```

## 为什么有 JSX 的写法？

json 的方式是标准的二次封装方式，Pro Components 呀、x-render 里面都可以见到，但发现仍然有很多同学喜欢 xml 的写法，喜欢横向的排布，所以提供了此方法。

而 Amiya 组件提供的 JSX 写法只是一个语法糖，并不能被其它元素包裹，实际会在内部转成 json 的。

目前可在 AySearchTable、AySearchList、AyDialogForm、AyForm 使用 JSX 语法糖。

另外 0.54.0 支持表单联动后，json 现在变得更强了，可以考虑单独把 json 配置独立一个文件出来。
