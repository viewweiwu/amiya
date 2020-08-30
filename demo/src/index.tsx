import { render } from 'react-dom'
import React from 'react'
import AmCtrl from '../../src/AmCtrl'
import AmButton from '../../src/AmButton'
import AmSearchTable from '../../src/AmSearchTable'
import 'antd/dist/antd.css'
export const emptyApi = (): any => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 300);
  });
};

export const listApi = (): any => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = {
        content: [
          {
            name: "王二"
          }
        ]
      };
      resolve(data);
    });
  });
};

const fields = [
  {
    title: "账号",
    key: "username"
  },
  {
    title: "昵称",
    key: "name",
    search: {},
    dialog: {}
  },
  {
    title: "用户类型",
    key: "name",
    search: {},
    dialog: {}
  },
  {
    title: "证件号",
    key: "name",
    search: {},
    dialog: {}
  },
  {
    title: "创建时间",
    key: "name",
    search: {},
    dialog: {}
  }
];

export default function Demo() {
  const meta = {
    title: "测试表格"
  };
  const CtrlField = {
    render: () => {
      return (
        <AmCtrl>
          <AmButton directive="update">编辑</AmButton>
          <AmButton>删除</AmButton>
        </AmCtrl>
      );
    }
  };
  return (
    <div className="App">
      <AmSearchTable
        selectionType="checkbox"
        api={listApi}
        fields={fields}
        meta={meta}
        dialogFormExtend={{
          fields: fields,
          updateApi: emptyApi,
          addApi: emptyApi
        }}
        ctrl={CtrlField}
      >
        <AmButton directive="batch-delete">批量删除</AmButton>
        <AmButton directive="add">新增</AmButton>
      </AmSearchTable>
    </div>
  );
}


render(<Demo />, document.querySelector('#demo'))
