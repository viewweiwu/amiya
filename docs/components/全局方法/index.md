---
hide: true
---

## 文件参考路径

### 使用 umi

如果你正在使用 umi，可以参考下面这种文件夹摆放方式。

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Tree, Typography } from 'antd'

const { Text } = Typography

const treeData = [
  {
    title: 'src',
    key: 'src',
    children: [
      {
        title: (
          <span>
            app.tsx<Text type="success">（文件内引入 /amiya/index.tsx）</Text>
          </span>
        ),
        key: 'app.tsx',
        isLeaf: true
      },
      {
        title: (
          <span>
            amiya<Text type="success">（amiya 的所有 文件配置放在这下面）</Text>
          </span>
        ),
        key: 'amiya',
        children: [
          {
            title: (
              <span>
                index.tsx<Text type="success">（配置的入口文件, 引入同文件夹的其它配置）</Text>
              </span>
            ),
            key: 'index.tsx',
            isLeaf: true
          },
          {
            title: (
              <span>
                [请输入配置的名字].tsx<Text type="danger">（给配置起个名字，放在这里）</Text>
              </span>
            ),
            key: 'SomeExtend.tsx',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    title: 'package.json',
    key: 'package.json',
    isLeaf: true
  },
  {
    title: '.umirc.ts',
    key: '.umirc.ts',
    isLeaf: true
  },
  {
    title: '.env',
    key: '.env',
    isLeaf: true
  }
]

export default function Demo() {
  return <Tree.DirectoryTree defaultExpandAll treeData={treeData} />
}
```

### 使用 cra (create-react-app)

```tsx
/**
 * inline: true
 */
import React from 'react'
import { Tree, Typography } from 'antd'

const { Text } = Typography

const treeData = [
  {
    title: 'src',
    key: 'src',
    children: [
      {
        title: (
          <span>
            index.tsx<Text type="success">（文件内引入 /amiya/index.tsx）</Text>
          </span>
        ),
        key: 'app.tsx',
        isLeaf: true
      },
      {
        title: (
          <span>
            amiya<Text type="success">（amiya 的所有 文件配置放在这下面）</Text>
          </span>
        ),
        key: 'amiya',
        children: [
          {
            title: (
              <span>
                index.tsx<Text type="success">（配置的入口文件, 引入同文件夹的其它配置）</Text>
              </span>
            ),
            key: 'index.tsx',
            isLeaf: true
          },
          {
            title: (
              <span>
                [请输入配置的名字].tsx<Text type="danger">（给配置起个名字，放在这里）</Text>
              </span>
            ),
            key: 'SomeExtend.tsx',
            isLeaf: true
          }
        ]
      }
    ]
  },
  {
    title: 'package.json',
    key: 'package.json',
    isLeaf: true
  }
]

export default function Demo() {
  return <Tree.DirectoryTree defaultExpandAll treeData={treeData} />
}
```
