import React, { useEffect, useMemo, useState } from 'react'

import { PlusOutlined } from '@ant-design/icons'
import { Spin, Upload } from 'antd'
import { UploadFile } from 'antd/lib/upload/interface'
import { AnyKeyProps } from 'amiya'

type Value = string | Array<string>

interface IProps {
  value?: Value
  onChange?: (value: Value) => void
  /** 是否是多图上传 */
  multiple?: boolean
  /** 多图上传时的上限 */
  max?: number
}

interface FileItem {
  uid: string
  name: string
  status: 'done'
  url: string
}

const uploadApi = (list: Array<any>): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      let result: Array<string> = []
      if (list.length) {
        list.forEach(item => {
          // 固定返回图片
          result.push('https://viewweiwu.github.io/amiya/images/logo.png?_' + Math.random())
        })
      }
      resolve({
        data: result
      })
    }, 300)
  })
}

export default function UploadImage(props: IProps) {
  const { value, onChange, multiple = false, max = 9 } = props
  const [loading, setLoading] = useState(false)

  // 文件列表
  const [fileList, setFileList] = useState<Array<FileItem>>([])
  const isUploadVisible = useMemo(() => {
    if (multiple) {
      let num = Array.isArray(value) ? value.length : 0
      return num < max
    } else {
      return !value
    }
  }, [value, multiple, max])

  useEffect(() => {
    if (Array.isArray(value)) {
      setFileList(
        (value || []).map(item => {
          return {
            uid: item,
            name: item,
            status: 'done',
            url: item
          }
        })
      )
    } else if (value) {
      setFileList([
        {
          uid: value,
          name: value,
          status: 'done',
          url: value
        }
      ])
    } else {
      setFileList([])
    }
  }, [value])

  const handleRemove = (file: UploadFile<UploadFile<any>>) => {
    if (multiple) {
      let newFileList = fileList.map(item => item.url === file?.url)
      let newValue = newFileList.map((file: any) => file.url)
      onChange && onChange(newValue)
    } else {
      onChange && onChange('')
    }
  }

  const beforeUpload = (file: File, list: Array<File>) => {
    setLoading(true)
    uploadApi(list)
      .then((res: AnyKeyProps) => {
        if (multiple) {
          let newFileList = [
            ...fileList,
            ...res.data.map((img: string, i: number) => {
              return {
                uid: img,
                name: list[i].name,
                status: 'done',
                url: img
              }
            })
          ]
          setFileList(newFileList)
          let newValue = newFileList.map(file => file.url)
          onChange && onChange(newValue)
        } else {
          onChange && onChange(res.data[0])
          setLoading(false)
        }
      })
      .finally(() => {
        setLoading(false)
      })
    return false
  }

  return (
    <Upload
      accept="image/*"
      listType="picture-card"
      beforeUpload={beforeUpload}
      fileList={fileList}
      multiple={multiple}
      onRemove={handleRemove}
    >
      {isUploadVisible && (
        <Spin spinning={loading}>
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传</div>
          </div>
        </Spin>
      )}
    </Upload>
  )
}
