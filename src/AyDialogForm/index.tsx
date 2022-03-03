import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  Ref,
  useRef,
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo
} from 'react'
import { Spin } from 'antd'
import AyDialog from '../AyDialog'
import AyForm from '../AyForm'
import { AyDialogFormField, ModeType, AyDialogFormRef, AyDialogFormProps } from './ay-dialog-form'
import { AyFormField } from '../AyForm/ay-form'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { convertChildrenToAyFormField } from '../AyFields/convertFields'
import { omitObj } from '../utils'
import locale from '../locale'

/** 新增模式 */
export const MODE_ADD = 'add'
/** 修改模式 */
export const MODE_UPDATE = 'update'
/** 详情模式 */
export const MODE_VIEW = 'view'
/** 自定义模式 */
export const MODE_CUSTOM = 'custom'

/**
 * 过滤获得 form 的配置项
 * @param fields 配置项 (dialog-form)
 */
const getAyFormFields = (
  fields: Array<AyDialogFormField>,
  mode: ModeType,
  initParams: AnyKeyProps,
  dialogOnly?: boolean
): Array<AyFormField> => {
  return fields
    .filter(field => {
      if (dialogOnly) {
        return !!field.dialog
      } else {
        return true
      }
    })
    .map(field => {
      let dialog = field.dialog

      let formField: AyFormField = {
        key: '_',
        ...omitObj(field, ['dialog']),
        ...dialog,
        _values: initParams
      }

      if (typeof formField.reSetting === 'function') {
        formField = formField.reSetting(formField, mode)
      }

      return formField
    })
    .filter(field => {
      if (field && Array.isArray(field.hiddenMode) && mode) {
        return !field.hiddenMode.includes(mode)
      }
      return field
    })
}

const getTitle = (mode: ModeType, title?: ReactNode): ReactNode => {
  if (title) {
    return title
  }
  let map: AnyKeyProps = {
    [MODE_ADD]: locale.dialog.modeAdd,
    [MODE_UPDATE]: locale.dialog.modeUpdate,
    [MODE_VIEW]: locale.dialog.modeDetail,
    [MODE_CUSTOM]: locale.dialog.modeCustom
  }
  return map[mode]
}
type Resolver = (value: AnyKeyProps) => void
type Rejector = (value: AnyKeyProps) => void
let dialogResolve: Resolver
let dialogReject: Rejector

/**
 * antd form 原生支持的方法尽数暴露出去
 */
const funcs = [
  'getFieldValue',
  'getFieldsValue',
  'getFieldError',
  'getFieldsError',
  'isFieldTouched',
  'isFieldsTouched',
  'isFieldValidating',
  'resetFields',
  'scrollToField',
  'setFields',
  'setFieldsValue',
  'submit',
  'validateFields'
]

export default forwardRef(function AyDialogForm(props: AyDialogFormProps, ref?: Ref<AyDialogFormRef>) {
  const {
    fields: originFields,
    title,
    addApi,
    updateApi,
    span,
    width,
    name,
    beforeSubmit,
    dialogExtend,
    formExtend,
    drawer,
    dialogOnly,
    autoClose = true,
    visible: defaultVisible,
    mode: defaultMode,
    spinning = false,
    onClose,
    onSuccess,
    onError,
    initialValues,
    children
  } = props

  const fields = useMemo(() => {
    const childrenFields = convertChildrenToAyFormField(children)
    return [...(originFields || []), ...childrenFields]
  }, [originFields, children])

  /** 弹窗是否可见 */
  const [visible, setVisible] = useState<boolean>(false)
  /** 当前所处于的模式 */
  let [mode, setMode] = useState<ModeType>(MODE_ADD)
  /** 表单是否可以编辑 */
  const [readonly, setReadonly] = useState<boolean>(false)
  /** 是否正在保存中 */
  const [loading, setLoading] = useState<boolean>(false)
  /** 默认参数 */
  const [initParams, setInitParams] = useState<AnyKeyProps>({})
  /** form 需要的 fields */
  let [formFields, setFormFields] = useState<Array<AyFormField>>(getAyFormFields(fields, mode, initParams, dialogOnly))
  /** form 控制 (需要主动调用里面的事件) */
  const formRef: MutableRefObject<any> = useRef()
  /** 默认弹窗标题 */
  const [dialogTitle, setDialogTitle] = useState<ReactNode>(title)
  /** 打开弹窗的配置 */
  const [config, setConfig] = useState<AnyKeyProps>({})

  useEffect(() => {
    setFormFields(getAyFormFields(fields, mode, initParams, dialogOnly))
  }, [fields])

  useEffect(() => {
    setDialogTitle(title)
  }, [title])

  // 监听显示变化
  useEffect(() => {
    setVisible(!!defaultVisible)
    if (defaultVisible) {
      requestAnimationFrame(() => {
        formRef.current.resetFields()
      })
      if (initialValues) {
        requestAnimationFrame(() => {
          formRef.current.setFieldsValue(initialValues)
        })
      }
    }
  }, [defaultVisible, initialValues])

  useEffect(() => {
    if (defaultMode) {
      setReadonly(defaultMode === MODE_VIEW)
      setMode(defaultMode)
    }
  }, [defaultMode])

  /**
   * 初始化弹窗
   * @step 1、打开弹窗，清空只读
   * @step 2、如果有值，清空表单值
   * @step 3、如果有默认参数、设置默认参数
   * @param params 默认值
   * @param config 标题、fields 配置
   */
  const initDialog = (params?: AnyKeyProps, config?: AnyKeyProps) => {
    setReadonly(false)
    setConfig(config || {})
    if (config && config.fields) {
      formFields = getAyFormFields(config.fields, mode, initParams, dialogOnly)
      setFormFields(formFields)
      // 同步刷新 renderContent、render 函数
      useEffect(() => {
        setFormFields(getAyFormFields(config.fields, mode, initParams, dialogOnly))
      }, [config.fields])
    } else {
      formFields = getAyFormFields(fields, mode, initParams, dialogOnly)
      setFormFields(formFields)
    }
    // 设置标题
    if (config && config.title) {
      setDialogTitle(config.title)
    }
    // 打开弹窗
    setVisible(true)
    // 第二次之后清空数据
    if (formRef.current) {
      formRef.current.resetFields()
    }
    // 设置默认值
    if (params) {
      setInitParams(params)
      requestAnimationFrame(() => {
        formRef.current.setFieldsValue(params)
      })
    } else {
      setInitParams({})
    }
  }

  const formInstans: AnyKeyProps = {
    /**
     * 新增表单
     * @param params 默认值
     */
    add: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      return new Promise((resolve: Resolver, reject: Rejector) => {
        dialogResolve = resolve
        dialogReject = reject
        mode = MODE_ADD
        setMode(defaultMode || MODE_ADD)
        initDialog(params, config)
      })
    },
    /**
     * 修改表单
     * @param params 默认值
     */
    update: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      return new Promise((resolve: Resolver, reject: Rejector) => {
        dialogResolve = resolve
        dialogReject = reject
        mode = MODE_UPDATE
        setMode(defaultMode || MODE_UPDATE)
        initDialog(params, config)
      })
    },
    /**
     * 查看表单
     * @param params 默认值
     * @param config
     */
    view: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      mode = MODE_VIEW
      setMode(defaultMode || MODE_VIEW)
      initDialog(params, config)
      setTimeout(() => {
        setReadonly(true)
      })
    },
    /**
     * 自定义表单，打开表单
     * @param params 默认值
     */
    open: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      mode = MODE_CUSTOM
      setMode(defaultMode || MODE_CUSTOM)
      initDialog(params, config)
    },
    /**
     * 刷新
     */
    refreshFields: () => {
      setFormFields(getAyFormFields(fields, mode, initParams, dialogOnly))
    },
    /**
     * 获取 form ref
     */
    getFormRef: () => {
      return formRef
    },
    /**
     * 关闭弹窗
     */
    closeDialog: () => {
      closeDialog()
    }
  }

  // 支持所有表单的方法
  funcs.forEach(func => {
    formInstans[func] = (...args: any) => formRef.current[func](...args)
  })

  // @ts-ignore 控制暴露出去的方法
  useImperativeHandle(ref, () => formInstans)

  /**
   * 弹窗确定触发表单提交
   */
  const onConfirm = () => {
    formRef.current.submit()
  }

  /**
   * 关闭弹窗
   */
  const closeDialog = () => {
    setVisible(false)
    onClose && onClose()
  }

  /**
   * 表单提交
   * @step 1、根据不同模式获取不同的 API 接口
   * @step 2、开始 loading
   * @step 3、成功后 reolsve、关闭弹窗
   * @step 4、关闭 loading
   * @param values 提交参数
   */
  const handleSubmit = (values: AnyKeyProps) => {
    const apiMap: AnyKeyProps = {
      [MODE_ADD]: addApi,
      [MODE_UPDATE]: updateApi,
      [MODE_CUSTOM]: config.api
    }
    const api = apiMap[mode]
    if (api) {
      let params: AnyKeyProps = { ...initParams, ...values }

      // 删除初始化的值携带
      for (let key in initParams) {
        if (key.startsWith('__')) {
          delete params[key]
        }
      }

      if (typeof beforeSubmit === 'function') {
        let result: AnyKeyProps | boolean = beforeSubmit(params, mode)
        if (result !== false) {
          params = result as AnyKeyProps
        } else {
          return
        }
      }
      setLoading(true)
      api(params)
        .then(
          (data: any) => {
            if (dialogResolve) {
              dialogResolve({ data, values, params, initParams, closeDialog })
            }
            if (config.onSuccess) {
              config.onSuccess({ data, values, params, initParams, closeDialog })
            }
            if (onSuccess) {
              onSuccess({ data, values, params, initParams, closeDialog })
            }
            if (autoClose) {
              closeDialog()
            }
          },
          (error: any) => {
            if (dialogReject) {
              dialogReject({ error, values, params, initParams, closeDialog })
            }
            if (config.onError) {
              config.onError({ error, values, params, initParams, closeDialog })
            }
            if (onError) {
              onError({ error, values, params, initParams, closeDialog })
            }
          }
        )
        .finally(() => {
          setLoading(false)
        })
    }
  }

  return (
    <AyDialog
      width={width}
      title={getTitle(mode, dialogTitle)}
      visible={visible}
      drawer={drawer}
      onConfirm={onConfirm}
      loading={loading}
      onClose={closeDialog}
      confirmVisible={mode !== MODE_VIEW && config.readonly !== true}
      {...dialogExtend}
    >
      <Spin spinning={spinning}>
        <AyForm
          name={name}
          readonly={readonly}
          ref={formRef}
          fields={formFields}
          span={span || 22}
          onConfirm={handleSubmit}
          {...formExtend}
        />
      </Spin>
    </AyDialog>
  )
})
