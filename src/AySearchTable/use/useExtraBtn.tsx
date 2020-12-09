import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react'
import AyButton from '../../AyButton'
import AyDialog from '../../AyDialog'
import { Dropdown, Menu, Checkbox, Space, Tooltip, Input } from 'antd'
import { AyTableField } from '../../AyTable/ay-table'
import { SizeType } from 'antd/lib/config-provider/SizeContext'
import { AySearchTableProps, SearchTableInitConfig } from '../ay-search-table'

const {
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} = require('@ant-design/icons')

/** 表格扩展按钮-是否显示 */
let defaultConfig: SearchTableInitConfig = {
  /** 扩展栏是否显示 */
  extraVisible: true,
  /** 扩展栏【刷新】按钮是否显示 */
  extraRefreshVisible: true,
  /** 扩展栏【密度】按钮是否显示 */
  extraSizeVisible: true,
  /** 扩展栏【密度】按钮默认值 */
  extraSizeDefaultValue: 'large',
  /** 扩展栏【展示列】按钮是否显示 */
  extraSettingVisible: true,
  /** 扩展栏【全屏】按钮是否显示 */
  extraFullscreenVisible: true
}
interface FieldEdit {
  /** 是否选中 */
  checked: boolean
  /** 标题 */
  title: string
  /** field 的 key */
  key: string
  /** 顺序 order */
  order: number
  /** 别名 */
  alias: string
}

export const setSearchTableExtraDefaultValue = (config: SearchTableInitConfig) => {
  defaultConfig = Object.assign({}, defaultConfig, config)
}

const useFieldsEdit = (
  tableFields: Array<AyTableField>,
  setTableFields: Dispatch<React.SetStateAction<AyTableField[]>>
) => {
  const [visible, setVisible] = useState<boolean>(false)
  let [normalFields, setNormalFields] = useState<Array<FieldEdit>>(
    tableFields
      .filter(field => {
        // 已经设置过展示的，直接通过判定
        if (field.__extraTouched) {
          return true
        }
        return !field.hidden
      })
      .map((field, i) => {
        return {
          checked: field.__hidden === false || field.__hidden === undefined,
          title: field.title || '',
          key: field.key || '',
          order: field.__order ?? i,
          alias: field.__alias || ''
        }
      })
  )

  const handleCheckedChange = (i: number, value: boolean) => {
    let newFields = [...normalFields]
    let fieldEdit = newFields[i]
    fieldEdit.checked = value
    setNormalFields(newFields)
  }

  const handleAliasChange = (i: number, value: string) => {
    let newFields = [...normalFields]
    let fieldEdit = newFields[i]
    fieldEdit.alias = value || ''
    setNormalFields(newFields)
  }

  /**
   * 向上移动元素位置
   * @param i 当前位置
   */
  const handleMoveUp = (i: number) => {
    if (i === 0) {
      return
    }
    const newFields = [...normalFields]
    const current = newFields[i]
    const prev = newFields[i - 1]
    let currentOrder = current.order
    current.order = prev.order
    prev.order = currentOrder
    ;[newFields[i], newFields[i - 1]] = [newFields[i - 1], newFields[i]]
    setNormalFields(newFields)
  }

  /**
   * 向下移动元素位置
   * @param i 当前位置
   */
  const handleMoveDown = (i: number) => {
    if (i === normalFields.length - 1) {
      return
    }
    const newFields = [...normalFields]
    // 赋值 order
    const current = newFields[i]
    const next = newFields[i + 1]
    let currentOrder = current.order
    current.order = next.order
    next.order = currentOrder
    ;[newFields[i], newFields[i + 1]] = [newFields[i + 1], newFields[i]]
    setNormalFields(newFields)
  }

  /**
   * 确认修改
   */
  const handleConfirm = () => {
    let newFields = [...tableFields]
    newFields.forEach(field => {
      let target: FieldEdit | undefined = normalFields.find((item: FieldEdit) => item.key === field.key)
      if (target) {
        field.__extraTouched = true
        field.__hidden = !target.checked
        field.__order = target.order
        field.__alias = target.alias
      }
    })
    setTableFields(newFields)
    setVisible(false)
  }

  return (
    <>
      <AyDialog title="设置展示列" visible={visible} setVisible={setVisible} onConfirm={handleConfirm}>
        {normalFields.map((fieldEdit, i) => {
          return (
            <div className="ay-search-table-extra-fields-edit-line" key={fieldEdit.key}>
              <div className="ay-search-table-extra-fields-edit-line-left">
                <Checkbox defaultChecked={fieldEdit.checked} onChange={e => handleCheckedChange(i, e.target.checked)}>
                  {fieldEdit.title}
                </Checkbox>
              </div>
              <div className="ay-search-table-extra-fields-edit-line-right">
                <Input
                  style={{ marginRight: 20 }}
                  value={fieldEdit.alias}
                  placeholder="请输入别名"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleAliasChange(i, e.target.value)}
                  allowClear
                />
                <Tooltip title="上移" placement="left">
                  <AyButton type="link" icon={<ArrowUpOutlined />} onClick={() => handleMoveUp(i)}></AyButton>
                </Tooltip>
                <Tooltip title="下移" placement="right">
                  <AyButton type="link" icon={<ArrowDownOutlined />} onClick={() => handleMoveDown(i)}></AyButton>
                </Tooltip>
              </div>
            </div>
          )
        })}
      </AyDialog>
      <Tooltip title="展示列">
        <AyButton type="text" icon={<SettingOutlined />} onClick={() => setVisible(true)}></AyButton>
      </Tooltip>
    </>
  )
}

export default function useExtraBtn(
  tableRef: any,
  tableFields: Array<AyTableField>,
  setTableFields: Dispatch<React.SetStateAction<AyTableField[]>>,
  props: AySearchTableProps
) {
  // 合并配置
  const config = Object.assign({}, defaultConfig, props)
  const {
    extraVisible,
    extraRefreshVisible,
    extraSizeVisible,
    extraSizeDefaultValue,
    extraSettingVisible,
    extraFullscreenVisible
  } = config
  /** 表格尺寸 */
  const [size, setSize] = useState<SizeType>(extraSizeDefaultValue)
  /** 表格全屏 */
  const [isEnter, setIsEnter] = useState<boolean>(false)

  const fieldsEdit = useFieldsEdit(tableFields, setTableFields)

  const handleRefresh = () => {
    tableRef.current.refresh()
  }

  const handleSizeChange = (e: any) => {
    setSize(e.key)
  }

  useEffect(() => {
    // body 的 style 防止滚动
    if (isEnter) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isEnter])

  const extraBtns = extraVisible ? (
    <div className="yt-search-table-extra-btns" key="yt-search-table-extra-btns">
      <Space>
        {extraRefreshVisible ? (
          <Tooltip title="刷新">
            <AyButton type="text" icon={<ReloadOutlined />} onClick={handleRefresh}></AyButton>
          </Tooltip>
        ) : null}

        {extraSizeVisible ? (
          <Tooltip title="密度">
            <Dropdown
              overlay={
                <Menu style={{ width: 100 }} selectedKeys={[size + '']} onClick={handleSizeChange}>
                  <Menu.Item key="large">默认</Menu.Item>
                  <Menu.Item key="middle">中等</Menu.Item>
                  <Menu.Item key="small">紧凑</Menu.Item>
                </Menu>
              }
            >
              <AyButton type="text" icon={<ColumnHeightOutlined />}></AyButton>
            </Dropdown>
          </Tooltip>
        ) : null}

        {extraSettingVisible ? fieldsEdit : null}

        {extraFullscreenVisible ? (
          isEnter ? (
            <Tooltip title="还原">
              <AyButton
                className="ay-search-table-fullscrenn-enter"
                type="text"
                icon={<FullscreenExitOutlined />}
                onClick={() => setIsEnter(false)}
              ></AyButton>
            </Tooltip>
          ) : (
            <Tooltip title="全屏">
              <AyButton
                className="ay-search-table-fullscrenn-out"
                type="text"
                icon={<FullscreenOutlined />}
                onClick={() => setIsEnter(true)}
              ></AyButton>
            </Tooltip>
          )
        ) : null}
      </Space>
    </div>
  ) : null

  return {
    extraBtns,
    isEnter,
    setIsEnter,
    size
  }
}
