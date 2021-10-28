import React, { useState, useEffect, useRef } from 'react'
import {
  Table,
  Image,
  Tag,
  Space,
  Button,
  Row,
  Col,
  Input,
  Form,
  Select,
  Card,
  message,
  Divider,
  Popconfirm
} from 'antd'
import { AnyKeyProps } from '@/types/AnyKeyProps'
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { deleteApi, listApi, professionOptions } from '../components/api'
import './antd-table.less'
import ModalEdit from './ModalEdit'

interface Record extends AnyKeyProps {}

export interface ModalDetail {
  visible: boolean
  record: Record
  mode: 'add' | 'update' | 'view'
}

export const layout = {
  labelCol: { flex: '120px' }, // label 宽度
  wrapperCol: { flex: '1' } // content 宽度
}

export default function AntdTable() {
  const [data, setData] = useState<Array<Record>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const formRef = useRef<any>(null)
  // 分页参数
  const [pagination, setPagination] = useState<AnyKeyProps>({
    pageSize: 10,
    current: 1
  })
  // 查询参数
  const searchParams = useRef<AnyKeyProps>({
    pagination,
    search: {}
  })
  // 弹窗信息
  const [modalDetail, setModalDetail] = useState<ModalDetail>({
    visible: false,
    record: {},
    mode: 'add'
  })

  const columns: Array<AnyKeyProps> = [
    {
      title: '头像',
      key: 'icon',
      dataIndex: 'icon',
      align: 'center',
      width: 80,
      render: (src: string) => {
        return <Image width={70} src={src} />
      }
    },
    {
      title: '姓名',
      key: 'cn',
      dataIndex: 'cn',
      render: (text: string, record: Record) => {
        return (
          <div>
            <div>{record.cn}</div>
            <div>{record.en}</div>
            <div>{record.jp}</div>
          </div>
        )
      }
    },
    {
      title: (
        <div>
          <div>势力</div>
          <div>出身地</div>
          <div>种族</div>
        </div>
      ),
      key: 'camp',
      dataIndex: 'camp',
      render: (text: string, record: Record) => {
        return (
          <div>
            <div>{record.camp}</div>
            <div>{record.birthplace}</div>
            <div>{record.race}</div>
          </div>
        )
      }
    },
    {
      title: '初始HP',
      key: 'ori-hp',
      dataIndex: 'ori-hp'
    },
    {
      title: '初始攻击',
      key: 'ori-atk',
      dataIndex: 'ori-atk'
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (value: Array<string>) => {
        if (!value || !value.length) {
          return ''
        }
        let colorMap: AnyKeyProps = {
          治疗: 'green',
          输出: 'red',
          爆发: 'orange',
          群攻: 'blue',
          生存: 'cyan',
          费用回复: 'gold',
          防护: 'purple',
          新手: 'geekblue',
          减速: 'lime',
          控场: 'red'
        }
        return value.map(tag => <Tag color={colorMap[tag]}>{tag}</Tag>)
      }
    },
    {
      title: '描述',
      key: 'feature',
      dataIndex: 'feature',
      width: 200,
      render: (value: string) => {
        return <div dangerouslySetInnerHTML={{ __html: value }}></div>
      }
    },
    {
      title: '操作',
      key: 'ctrl',
      dataIndex: 'ctrl',
      width: 200,
      render: (value: any, record: Record) => {
        return (
          <Space className="antd-table-ctrl" split={<Divider type="vertical" />}>
            <Button type="link" onClick={() => handleView(record)}>
              详情
            </Button>
            <Button type="link" onClick={() => handleUpdate(record)}>
              编辑
            </Button>
            <Popconfirm title="确定要删除此行吗？" onConfirm={() => handleDelete(record)}>
              <Button type="link">删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  /**
   * 获取接口数据
   */
  const getData = () => {
    setLoading(true)
    listApi(searchParams.current)
      .then(res => {
        setData(res.content)
        setTotal(res.totalCount)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  /**
   * 重置按钮
   */
  const handleReset = () => {
    searchParams.current.search = {}
    getData()
  }

  /**
   * 查询参数
   * @param values 提交的表单
   */
  const handleSearch = (values: AnyKeyProps) => {
    let newPagination = { ...pagination }
    searchParams.current.search = values
    searchParams.current.pagination.current = 1
    newPagination.current = 1
    setPagination(newPagination)
    getData()
  }

  /**
   * 表格改变
   */
  const handleTableChange = (pagination: AnyKeyProps) => {
    searchParams.current.pagination = pagination
    setPagination(pagination)
    getData()
  }

  /**
   * 查看当前行
   * @param record 当前行
   */
  const handleView = (record: Record) => {
    setModalDetail({
      visible: true,
      record: record,
      mode: 'view'
    })
  }

  /**
   * 添加数据
   */
  const handleAdd = () => {
    setModalDetail({
      visible: true,
      record: {},
      mode: 'add'
    })
  }

  /**
   * 编辑当前行
   * @param record 当前行
   */
  const handleUpdate = (record: Record) => {
    setModalDetail({
      visible: true,
      record,
      mode: 'update'
    })
  }

  /**
   * 删除当前行
   * @param record 当前行
   */
  const handleDelete = (record: Record) => {
    deleteApi([record.sort_id]).then(() => {
      message.success('删除成功')
      getData()
    })
  }

  /**
   * 弹窗完成关闭
   */
  const handleModalClose = () => setModalDetail({ ...modalDetail, visible: false })

  /**
   * 新增｜编辑完成
   */
  const handleModalSuccess = () => {
    setModalDetail({ ...modalDetail, visible: false })
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="antd-table">
      <Card className="antd-table-search">
        <Form {...layout} style={{ paddingRight: 20 }} ref={formRef} onFinish={handleSearch}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="姓名" name="cn">
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="英文名" name="en">
                <Input placeholder="请输入英文名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="日文名" name="jp">
                <Input placeholder="请输入日文名" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="职业" name="class">
                <Select placeholder="请选择职业" options={professionOptions} />
              </Form.Item>
            </Col>
            <Col span={8} style={{ paddingLeft: 40 }}>
              <Space>
                <Button htmlType="submit" icon={<SearchOutlined />} type="primary">
                  查询
                </Button>
                <Button htmlType="reset" icon={<ReloadOutlined />} onClick={handleReset}>
                  重置
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card bodyStyle={{ padding: 0 }}>
        <div className="antd-table-header">
          <h2 className="antd-table-title">antd 组件增删改查</h2>
          <span>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
              新增
            </Button>
          </span>
        </div>
        <Table
          bordered
          rowKey="sort_id"
          loading={loading}
          onChange={handleTableChange}
          pagination={{
            pageSize: pagination.pageSize,
            current: pagination.current,
            total
          }}
          rowSelection={{ type: 'checkbox', columnWidth: 50 }}
          dataSource={data}
          columns={columns}
        />
        <ModalEdit detail={modalDetail} onClose={handleModalClose} onSuccess={handleModalSuccess} />
      </Card>
    </div>
  )
}
