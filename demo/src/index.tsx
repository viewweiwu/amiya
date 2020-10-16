import { render } from 'react-dom'
import React, { useEffect, useState } from 'react'
import AyCtrl from '../../src/AyCtrl'
import AyAction, { registerAction } from 'amiya/es/AyAction'
import AySearchTable from '../../src/AySearchTable'
import 'antd/dist/antd.css'
import { setDefaultDataFilter, setDefaultSearchFilter } from '../../src/AyTable'
import { AyFormField, FieldListener } from '../../src/AyForm/ay-form'
import AyForm, { registerField } from '../../src/AyForm'
import { Input, Switch } from 'antd'

export const emptyApi = (): any => {
  console.info('接口被调用')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

export const listApi = (): any => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = {
        content: [
          {
            id: 'hello',
            username: '你撒地竞赛大奖赛打家劫舍嗲第三届爱多久啊司机打死打死',
            name: '王二'
          }
        ]
      }
      resolve(data)
    })
  })
}

setDefaultDataFilter((data: any) => {
  return {
    totalCount: 100,
    content: data.content
  }
})

setDefaultSearchFilter((parmas: any) => {
  return parmas
})

const finishFields = [
  {
    title: '你好',
    key: 'hello',
    dialog: []
  }
]

registerAction('test', (props, record, searchTable) => {
  return {
    children: 'hello',
    onClick: () => {
      searchTable.formRef.current.open(record, { title: '测试', fields: finishFields, api: emptyApi })
    },
    ...props
  }
})

const fields = [
  {
    title: '账号',
    key: 'username',
    table: {
      ellipsis: true
    }
  },
  {
    title: '昵称',
    key: 'name',
    search: {},
    dialog: {}
  },
  {
    title: '用户类型',
    key: 'type',
    search: {},
    dialog: {}
  },
  {
    title: '证件号',
    key: 'card',
    search: {},
    dialog: {}
  },
  {
    title: '创建时间',
    key: 'date',
    type: 'date',
    search: {},
    dialog: {}
  },
  {
    title: '开关',
    key: 'switch',
    type: 'switch',
    search: {
      props: {
        checkedChildren: '开启',
        unCheckedChildren: '关闭'
      }
    }
  }
]

const testFormField: Array<AyFormField> = [
  {
    title: '输入框',
    key: 'input',
    type: 'input'
  },
  {
    title: '数字输入框',
    key: 'number',
    type: 'number'
  },
  {
    title: '百分比输入框',
    key: 'percent',
    type: 'percent'
  },
  {
    title: '密码框',
    key: 'password',
    type: 'password'
  },
  {
    title: '富文本框',
    key: 'editor',
    type: 'editor'
  },
  {
    title: '多行文本框',
    key: 'textarea',
    type: 'textarea'
  },
  {
    title: '选择框',
    key: 'select',
    type: 'select',
    options: [
      { label: '选项A', value: 'A' },
      { label: '选项B', value: 'B' }
    ]
  },
  {
    title: '开关',
    key: 'switch',
    type: 'switch',
    onChange: (value, allValues, setFieldsValue) => {
      console.log(value, allValues, setFieldsValue)
    }
  },
  {
    title: '单个选择框',
    key: 'checkbox',
    type: 'checkbox',
    props: {
      children: 'hello'
    }
  },
  {
    title: '多个选择框',
    key: 'checkbox-group',
    type: 'checkbox-group',
    options: [
      { label: '选项A', value: 'A' },
      { label: '选项B', value: 'B' }
    ]
  },
  {
    title: '多个单选框',
    key: 'radio-group',
    type: 'radio-group',
    options: [
      { label: '选项A', value: 'A' },
      { label: '选项B', value: 'B' }
    ]
  },
  {
    title: '日期',
    key: 'date',
    type: 'date'
  },
  {
    title: '日期区间',
    key: 'date-range',
    type: 'date-range'
  }
]

interface OrgSelectProps {
  value?: string | number
  onChange?: (value: any) => void
  addFieldListener: (key: string, fieldListener: FieldListener) => void
}

const OrgSelect = (props: OrgSelectProps) => {
  const { addFieldListener, value, onChange } = props
  const [memberValue, setMemberValue] = useState<boolean>(false)

  useEffect(() => {
    addFieldListener('member', (value) => {
      console.log(value)
      setMemberValue(value)
    })
  }, [])

  return <Input value={value} onChange={onChange} disabled={memberValue} />
}

registerField({
  type: 'org',
  defaultValue: '',
  render: (
    field: AyFormField,
    setFieldsValue: (params: any) => void,
    readonly: boolean,
    addFieldListener: (key: string, fieldListener: FieldListener) => void
  ) => {
    return <OrgSelect addFieldListener={addFieldListener} />
  }
})

const cascaderFields: Array<AyFormField> = [
  {
    key: 'member',
    type: 'checkbox',
    span: 3,
    props: {
      children: '要编辑吗？'
    }
  },
  {
    key: 'org',
    type: 'org'
  }
]

const CtrlField = {
  width: 150,
  render: (value: any, record: any) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="update">
          编辑
        </AyAction>
        <AyAction record={record} action="delete">
          删除
        </AyAction>
        <AyAction record={record} action="view">
          详情
        </AyAction>
        <AyAction record={record} action="test">
          结算
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  const [readonly, setReadonly] = useState(false)
  return (
    <div className="App">
      <AySearchTable
        selectionType="checkbox"
        api={listApi}
        fields={fields}
        title="测试表格"
        deleteApi={emptyApi}
        dialogFormExtend={{
          fields: fields,
          updateApi: emptyApi,
          addApi: emptyApi
        }}
        ctrl={CtrlField}
      >
        <AyAction action="batch-delete">批量删除</AyAction>
        <AyAction action="add">新增</AyAction>
      </AySearchTable>
      <Switch checked={readonly} onChange={(readonly) => setReadonly(readonly)} />
      <AyForm fields={cascaderFields}></AyForm>
      <div style={{ marginTop: 50 }}></div>
      <AyForm fields={testFormField} readonly={readonly}></AyForm>
    </div>
  )
}

render(<Demo />, document.querySelector('#demo'))
