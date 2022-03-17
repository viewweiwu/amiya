# FAQ

## 为什么组件没有样式?

amiya 除了携带自己少量的样式外，并不会打包 antd 的样式，所以有可能会缺少 antd 组件的样式，可以在全局对应样式即可。

解决方法一：

```css
// 引入全部样式
import 'antd/dist/antd.css';
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
