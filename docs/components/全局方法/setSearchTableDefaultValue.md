# 全局 AySearchTable 右侧按钮配置

这个页面的代码是写在 `/src/amiya/config.tsx` 文件里的，如果你还没有，请点击 [这里](../) 查看如何创建。

如果每一个地方都需要配置太麻烦，可以在全局入口按照下面的配置进行全局配置。

局部配置 优先于 全局配置。

局部配置请参考 [这里](/table/扩展按钮配置)。

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
