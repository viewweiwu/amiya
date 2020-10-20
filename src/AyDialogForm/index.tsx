import React, { useState, forwardRef, useImperativeHandle, Ref, useRef, MutableRefObject, useCallback, ReactNode } from 'react'
import AyDialog from '../AyDialog'
import AyForm from '../AyForm'
import AyButton from '../AyButton'
import { AyDialogFormField, ModeType, AydialogFormRef, AyDialogFormProps } from './ay-dialog-form'
import { AyFormField } from '../AyForm/ay-form'
import { AnyKeyProps } from '../types/AnyKeyProps'

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
const getAyFormFields = (fields: Array<AyDialogFormField>, mode: ModeType, initParams: AnyKeyProps): Array<AyFormField> => {
  return fields
    .filter((field) => {
      if (field.dialog && Array.isArray(field.dialog.hiddenMode) && mode) {
        return !field.dialog.hiddenMode.includes(mode)
      }
      return field.dialog
    })
    .map((field) => {
      let dialog = field.dialog

      let formField: AyFormField = {
        key: '',
        ...field,
        ...dialog,
        _values: initParams
      }

      if (typeof formField.reSetting === 'function') {
        formField = formField.reSetting(formField, mode)
      }

      formField._field = field

      return formField
    })
}

const getTitle = (mode: ModeType, title?: ReactNode): ReactNode => {
  if (title) {
    return title
  }
  let map: AnyKeyProps = {
    [MODE_ADD]: '新增',
    [MODE_UPDATE]: '编辑',
    [MODE_VIEW]: '详情',
    [MODE_CUSTOM]: '自定义'
  }
  return map[mode]
}
type Resolver = (value: AnyKeyProps) => void
let dialogResolve: Resolver

export default forwardRef(function AyDialogForm(props: AyDialogFormProps, ref?: Ref<AydialogFormRef>) {
  const { fields, title, addApi, updateApi, span, width, name, beforeSubmit } = props
  /** 弹窗是否可见 */
  const [visible, setVisible] = useState<boolean>(false)
  /** 当前所处于的模式 */
  const [mode, setMode] = useState<ModeType>(MODE_ADD)
  /** 是否正在保存中 */
  const [loading, setLoading] = useState<boolean>(false)
  /** 默认参数 */
  const [initParams, setInitParams] = useState<AnyKeyProps>({})
  /** form 需要的 fields */
  let [formFields, setFormFields] = useState<Array<AyFormField>>(getAyFormFields(fields, mode, initParams))
  /** form 控制 (需要主动调用里面的事件) */
  const formRef: MutableRefObject<any> = useRef()
  /** 默认弹窗标题 */
  const [dialogTitle, setDialogTitle] = useState<ReactNode>(title)
  /** 打开弹窗的配置 */
  const [config, setConfig] = useState<AnyKeyProps>({})

  /**
   * 初始化弹窗
   * @step 1、打开弹窗
   * @step 2、如果有值，清空表单值
   * @step 3、如果有默认参数、设置默认参数
   * @param params 默认值
   */
  const initDialog = (params?: AnyKeyProps, config?: AnyKeyProps) => {
    setConfig(config || {})
    if (config && config.fields) {
      formFields = getAyFormFields(config.fields, mode, initParams)
      setFormFields(formFields)
    } else {
      formFields = getAyFormFields(props.fields, mode, initParams)
      setFormFields(formFields)
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
      setTimeout(() => {
        formRef.current.setFieldsValue(params)
      })
    } else {
      setInitParams({})
    }
    // 设置标题
    if (config && config.title) {
      setDialogTitle(config.title)
    }
  }

  // 控制暴露出去的方法
  useImperativeHandle(ref, () => ({
    /**
     * 新增表单
     * @param params 默认值
     */
    add: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      return new Promise((resolve: Resolver) => {
        dialogResolve = resolve
        setMode(MODE_ADD)
        initDialog(params, config)
      })
    },
    /**
     * 修改表单
     * @param params 默认值
     */
    update: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      return new Promise((resolve: Resolver) => {
        dialogResolve = resolve
        setMode(MODE_UPDATE)
        initDialog(params, config)
      })
    },
    /**
     * 查看表单
     * @param params 默认值
     * @param config
     */
    view: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      setMode(MODE_VIEW)
      initDialog(params, config)
    },
    /**
     * 自定义表单，打开表单
     * @param params 默认值
     */
    open: (params?: AnyKeyProps, config?: AnyKeyProps) => {
      setMode(MODE_CUSTOM)
      initDialog(params, config)
    }
  }))

  /**
   * 弹窗确定触发表单提交
   */
  const onConfirm = useCallback(() => {
    formRef.current.submit()
  }, [])

  /**
   * 表单提交
   * @step 1、根据不同模式获取不同的 API 接口
   * @step 2、开始 loading
   * @step 3、成功后 reolsve、关闭弹窗
   * @step 4、关闭 loading
   * @param values 提交参数
   */
  const handleSubmit = useCallback(
    (values: AnyKeyProps) => {
      const apiMap = {
        [MODE_ADD]: addApi,
        [MODE_UPDATE]: updateApi,
        [MODE_CUSTOM]: config.api
      }
      const api = apiMap[mode]
      if (api) {
        let params: AnyKeyProps = { ...initParams, ...values }
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
                dialogResolve(data)
              }
              setVisible(false)
            },
            () => {}
          )
          .finally(() => {
            setLoading(false)
          })
      }
    },
    [addApi, beforeSubmit, initParams, mode, updateApi]
  )

  return (
    <AyDialog
      width={width}
      title={getTitle(mode, dialogTitle)}
      visible={visible}
      setVisible={setVisible}
      onConfirm={onConfirm}
      loading={loading}
      footer={mode === MODE_VIEW || config.readonly === true ? <AyButton onClick={() => setVisible(false)}>关闭</AyButton> : undefined}
      {...props}
    >
      <AyForm name={name} readonly={mode === MODE_VIEW} ref={formRef} fields={formFields} span={span || 22} onConfirm={handleSubmit} />
    </AyDialog>
  )
})
