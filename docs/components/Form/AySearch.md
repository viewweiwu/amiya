## AySearch

AySearch 会随着容器宽度改变而改变个数，可以尝试 `浏览器放大缩小`，或 `改变浏览器宽度` 来观察示例的变化。

1. 容器宽度 > 1300，一行 4 个。
2. 容器宽度 > 900，一行 3 个。
3. 容器宽度 > 700，一行 2 个。
4. 容器宽度 < 700，一行 1 个。

<Alert>容器超过两行，会自动折叠，</Alert>

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1',
    required: true
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  },
  {
    title: '第九个',
    key: '9'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  },
  {
    title: '第九个',
    key: '9'
  },
  {
    title: '第十个',
    key: '10'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  },
  {
    title: '第九个',
    key: '9'
  },
  {
    title: '第十个',
    key: '10'
  },
  {
    title: '第十一个',
    key: '11'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  },
  {
    title: '第九个',
    key: '9'
  },
  {
    title: '第十个',
    key: '10'
  },
  {
    title: '第十一个',
    key: '11'
  },
  {
    title: '第十二个',
    key: '12'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

## 默认展开全部

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  },
  {
    title: '第九个',
    key: '9'
  },
  {
    title: '第十个',
    key: '10'
  },
  {
    title: '第十一个',
    key: '11'
  }
]

export default function Demo() {
  return <AySearch fields={fields} defaultOpen />
}
```

```diff
<AySearch
  fields={fields}
+ defaultOpen
/>
```

## 隐藏 展开/收起 按钮

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4'
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  },
  {
    title: '第八个',
    key: '8'
  },
  {
    title: '第九个',
    key: '9'
  },
  {
    title: '第十个',
    key: '10'
  },
  {
    title: '第十一个',
    key: '11'
  }
]

export default function Demo() {
  return <AySearch fields={fields} defaultOpen toggleVisible={false} />
}
```

```diff
<AySearch
  fields={fields}
  defaultOpen
+ toggleVisible={false}
/>
```

## 跨格

希望某个查询项宽那么一点点...

```tsx
import React from 'react'
import { AySearch, AySearchField } from 'amiya'

let fields: AySearchField[] = [
  {
    title: '第一个',
    key: '1'
  },
  {
    title: '第二个',
    key: '2'
  },
  {
    title: '第三个',
    key: '3'
  },
  {
    title: '第四个',
    key: '4',
    type: 'date-range',
    props: {
      showTime: true
    },
    grid: {
      large: 12,
      middle: 12,
      small: 12,
      mini: 24
    }
  },
  {
    title: '第五个',
    key: '5'
  },
  {
    title: '第六个',
    key: '6'
  },
  {
    title: '第七个',
    key: '7'
  }
]

export default function Demo() {
  return <AySearch fields={fields} />
}
```

```diff
let fields: AySearchField[] = [
  // ...
  {
    title: '第四个',
    key: '4',
    type: 'date-range',
    props: {
      showTime: true
    },
-   // 指定 span 值是无效的，因为不同容器的宽度，所占的 span 值不同，请使用 grid 来占位
-   // span: 8,
    // 指定 4 种尺寸的 grid 占格
+   grid: {
+     large: 12,
+     middle: 12,
+     small: 12,
+     mini: 24
+   }
  }
  // ...
]
```

<Alert>AySearch 的 span 值是无效的，请使用 grid 来指定占格</Alert>

## Props 参数

| 参数名        | 说明                     | 参数类型               | 默认值 |
| ------------- | ------------------------ | ---------------------- | ------ |
| toggleVisible | 展开/收起 按钮的显示     | boolean                | true   |
| defaultOpen   | 超过两行时，是否默认展开 | boolean                | false  |
| fields        | 表单项                   | Array\<AySearchField\> | -      |

## AySearchField 参数

| 参数名 | 说明                                                                                       | 参数类型 | 默认值 |
| ------ | ------------------------------------------------------------------------------------------ | -------- | ------ |
| grid   | 不同容器宽度状态下所占用的值                                                               | object   | -      |
| span   | 请不要使用此参数，设置了也无效，它被 grid 替代了                                           | -        | -      |
| ...    | 其它参数都跟 AyForm 的一样，所以，[AyForm](../form#ayformfield-参数) 注册过的 field 都有效 | -        | -      |
