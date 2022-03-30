import { Option } from '../AyForm/ay-form'
import { AnyKeyProps } from 'amiya'
import { useEffect, useState } from 'react'
import { listToTree } from '../utils'
import { IConfig, Transform } from './use-options'

const defaultTransform = {
  label: 'label',
  value: 'value',
  children: 'children',
  parentId: 'parentId',
  rootValue: null,
  keepLeaf: false
}

const defaultConfig: IConfig = {
  path: [],
  params: {},
  keepOrigin: false,
  toTree: false
}

/** 递归寻找下层 */
const loop = (options: Array<Option>, level: number = 0, transform: Transform, keepOrigin: boolean): Array<Option> => {
  return options.map((option, index) => {
    let newOption: Option = { value: undefined }
    if (typeof transform === 'function') {
      newOption = transform(option, index, level)
    } else {
      let { label, value, children, parentId } = { ...defaultTransform, ...transform }
      newOption = {
        label: option[label],
        value: option[value],
        children: option[children]
      }
      if (keepOrigin) {
        newOption = {
          ...option,
          ...newOption
        }
      }
      if (option.hasOwnProperty(parentId)) {
        newOption[parentId] = option[parentId]
      }
    }

    // 如果还有子元素，递归下级
    if (newOption.children && newOption.children.length) {
      newOption.children = loop(newOption.children, level + 1, transform, keepOrigin)
    }
    return newOption
  })
}

export default function useOptions(api: (params: AnyKeyProps) => Promise<AnyKeyProps>, config?: IConfig) {
  const { path, params, transform, keepOrigin = false, toTree = false, onLoad, autoload = true } = {
    ...defaultConfig,
    ...config
  }
  const [options, setOptions] = useState<Array<Option>>([])
  const [data, setData] = useState<any>(null)
  const [tree, setTree] = useState<Array<Option>>([])
  const [loading, setLoading] = useState(false)

  const getData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    api(params || {})
      .then(res => {
        setData(res)
        let options = res
        if (path && path.length) {
          path.forEach(key => {
            options = options[key]
          })
        }
        if (transform) {
          options = loop(options as Array<Option>, 0, transform, keepOrigin)
        }

        setOptions(options as Array<Option>)

        if (toTree) {
          let config = { ...defaultTransform, ...transform }
          let tree = listToTree({
            data: options as Array<Option>,
            parentKey: config.parentId,
            labelKey: config.label,
            childrenKey: config.children,
            valueKey: config.value,
            rootValue: config.rootValue,
            keepLeaf: config.keepLeaf
          }) as Array<Option>

          setTree(tree)
        }
        if (onLoad) {
          onLoad({ options, tree, data, loading })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (autoload) {
      getData()
    }
  }, [])

  return {
    options,
    tree,
    loading,
    data,
    load: getData
  }
}
