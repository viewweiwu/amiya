---
order: 3
---

# AySearchTable 全局右侧按钮配置

如果每一个地方都需要配置太麻烦，可以在全局入口按照下面的配置进行全局配置。

局部配置 优先于 全局配置。

局部配置请参考 [这里](/table/extra-config)。

```js
import { setSearchTableDefaultValue } from 'amiya'

setSearchTableDefaultValue({
  /** 扩展栏是否显示 */
  extraVisible: true,
  /** 扩展栏【刷新】按钮是否显示 */
  extraRefreshVisible: true,
  /** 扩展栏【密度】按钮是否显示 */
  extraSizeVisible: true,
  /** 扩展栏【密度】按钮默认值 */
  /** 可选值：large、middle、small */
  extraSizeDefaultValue: 'large',
  /** 扩展栏【展示列】按钮是否显示 */
  extraSettingVisible: true,
  /** 扩展栏【全屏】按钮是否显示 */
  extraFullscreenVisible: true
})
```

<embed src="./index.md"></embed>
