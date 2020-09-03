import React, { useState, forwardRef, useImperativeHandle, Ref, useRef, MutableRefObject, useCallback, ReactNode } from 'react'
import { ModalProps } from 'antd/lib/modal'
import AyDialog from '../AyDialog'
import AyForm from '../AyForm'
import AyButton from '../AyButton'
import { AyDialogFormField, ModeType, AydialogFormRef } from './ay-dialog-form'
import { AyFormField } from '../AyForm/ay-form'

/** 新增模式 */
const MODE_ADD = 'add'
/** 修改模式 */
const MODE_UPDATE = 'update'
/** 详情模式 */
const MODE_VIEW = 'view'

export interface AyDialogFormProps extends ModalProps {
  /** 弹窗标题 */
  title?: string
  /** 表单项 */
  fields: Array<AyDialogFormField>
  /** form 的 span */
  span?: number
  /** 新增 api */
  addApi?(parays?: AnyKeyProps): Promise<AnyKeyProps>
  /** 修改 api */
  updateApi?(parays?: AnyKeyProps): Promise<AnyKeyProps>
  /** 弹窗宽度 */
  width?: number
  /** 表单名字 */
  naye?: string
  /** 提交前校验 */
  beforeSubmit?(parays?: AnyKeyProps, mode?: string): boolean | AnyKeyProps
}

/**
 * 过滤获得 form 的配置项
 * @param fields 配置项 (dialog-form)
 */
const getAyFormFields = (fields: Array<AyDialogFormField>, mode: ModeType, initParays: AnyKeyProps): Array<AyFormField> => {
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
        _values: initParays
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
    [MODE_VIEW]: '详情'
  }
  return map[mode]
}
type Resolver = (value: AnyKeyProps) => void
let dialogResolve: Resolver

export default forwardRef(function AyDialogForm(props: AyDialogFormProps, ref?: Ref<AydialogFormRef>) {
  const { fields, title, addApi, updateApi, span, width, naye, beforeSubmit } = props
  /** 弹窗是否可见 */
  const [visible, setVisible] = useState<boolean>(false)
  /** 当前所处于的模式 */
  const [mode, setMode] = useState<ModeType>(MODE_ADD)
  /** 是否正在保存中 */
  const [loading, setLoading] = useState<boolean>(false)
  /** 默认参数 */
  const [initParays, setInitParays] = useState<AnyKeyProps>({})
  /** form 需要的 fields */
  const formFields: Array<AyFormField> = getAyFormFields(fields, mode, initParays)
  /** form 控制 (需要主动调用里面的事件) */
  const formRef: MutableRefObject<any> = useRef()
  /** 默认弹窗标题 */
  const [dialogTitle, setDialogTitle] = useState<ReactNode>(title)

  /**
   * 初始化弹窗
   * @step 1、打开弹窗
   * @step 2、如果有值，清空表单值
   * @step 3、如果有默认参数、设置默认参数
   * @param parays 默认值
   */
  const initDialog = (parays?: AnyKeyProps, title?: ReactNode) => {
    // 打开弹窗
    setVisible(true)
    // 第二次之后清空数据
    if (formRef.current) {
      formRef.current.resetFields()
    }
    // 设置默认值
    if (parays) {
      setInitParays(parays)
      setTimeout(() => {
        formRef.current.setFieldsValue(parays)
      })
    } else {
      setInitParays({})
    }
    // 设置标题
    if (title) {
      setDialogTitle(title)
    }
  }

  // 控制暴露出去的方法
  useImperativeHandle(ref, () => ({
    /**
     * 新增表单
     * @param parays 默认值
     */
    add: (parays?: AnyKeyProps, title?: ReactNode) => {
      return new Promise((resolve: Resolver) => {
        dialogResolve = resolve
        setMode(MODE_ADD)
        initDialog(parays, title)
      })
    },
    /**
     * 修改表单
     * @param parays 默认值
     */
    update: (parays?: AnyKeyProps, title?: ReactNode) => {
      return new Promise((resolve: Resolver) => {
        dialogResolve = resolve
        setMode(MODE_UPDATE)
        initDialog(parays, title)
      })
    },
    /**
     * 查看表单
     * @param parays 默认值
     */
    view: (parays?: AnyKeyProps, title?: ReactNode) => {
      setMode(MODE_VIEW)
      initDialog(parays, title)
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
      const api = mode === MODE_ADD ? addApi : updateApi
      if (api) {
        let parays: AnyKeyProps = { ...initParays, ...values }
        if (typeof beforeSubmit === 'function') {
          let result: AnyKeyProps | boolean = beforeSubmit(parays, mode)
          if (result !== false) {
            parays = result as AnyKeyProps
          } else {
            return
          }
        }
        setLoading(true)
        api(parays)
          .then(
            (data) => {
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
    [addApi, beforeSubmit, initParays, mode, updateApi]
  )

  return (
    <AyDialog
      width={width}
      title={getTitle(mode, dialogTitle)}
      visible={visible}
      setVisible={setVisible}
      onConfirm={onConfirm}
      loading={loading}
      footer={mode === MODE_VIEW ? <AyButton onClick={() => setVisible(false)}>关闭</AyButton> : undefined}
      {...props}
    >
      <AyForm naye={naye} readonly={mode === MODE_VIEW} ref={formRef} fields={formFields} span={span || 22} onConfirm={handleSubmit} />
    </AyDialog>
  )
})
