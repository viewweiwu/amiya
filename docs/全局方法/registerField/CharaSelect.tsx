import React, { useState, useMemo, ReactNode } from 'react'
import { AyButton, AyDialog } from 'amiya'
import './index.less'

interface CharaSelectProps {
  value?: string
  onChange?: (value: string) => void
  readonly?: boolean
}

// 数据
const data: Array<any> = [
  {
    id: 1,
    cname: '阿米娅',
    name: 'Amiya',
    cg: 'https://misc.hzzcckj.cn/upload/image/202010/aaaa793df000000.png',
    star: 5
  },
  {
    id: 2,
    cname: '能天使',
    name: 'Exusiai',
    cg: 'https://misc.hzzcckj.cn/upload/image/202010/aaaa7a7e6000000.png',
    star: 6
  },
  {
    id: 3,
    cname: '瑕光',
    name: 'Blemishine',
    cg: 'https://misc.hzzcckj.cn/upload/image/202010/aaaa7b481c00000.png',
    star: 6
  }
]

// 人物卡片
function CharaCard(props: any) {
  const { chara, onClick, value } = props
  return (
    <div className="chara-card" onClick={onClick}>
      <header className="rarity">{''.padEnd(chara.star * 2, '⭐️')}</header>
      <img className="cg" src={chara.cg} />
      <div className="line"></div>
      <div className="shadow"></div>
      <div className="name">
        <div>{chara.name}</div>
        <div className="cname">{chara.cname}</div>
      </div>
      {value === chara.id && <div className="checked">已选择</div>}
    </div>
  )
}

// 人物选择
export default function CharaSelect(props: CharaSelectProps) {
  const { value, onChange, readonly } = props
  const [checked, setChecked] = useState<string>(value || '')
  const [visible, setVisible] = useState<boolean>(false)

  // 获得选中的人物
  const activeChara = useMemo(() => {
    return data.find(chara => chara.id === value)
  }, [value])

  // 打开弹窗选择
  const handleSelect = () => {
    setChecked(value || '')
    setVisible(true)
  }

  // 提交选择
  const handleConfirm = () => {
    onChange && onChange(checked)
    setVisible(false)
  }

  // 清空选择
  const handleClear = () => {
    setChecked('')
    onChange && onChange('')
  }

  let content: ReactNode = readonly ? null : <AyButton onClick={handleSelect}>角色选择</AyButton>

  // 如果已经有选中的
  if (activeChara) {
    if (readonly) {
      // 只读模式只需要渲染卡片
      return <CharaCard chara={activeChara} onClick={handleSelect} />
    } else {
      // 渲染卡片和清空
      content = (
        <>
          <CharaCard chara={activeChara} onClick={handleSelect} />
          <p>
            <AyButton onClick={handleClear}>清空</AyButton>
          </p>
        </>
      )
    }
  }

  return (
    <div className="chara-select">
      {content}
      {readonly ? null : (
        <AyDialog title="角色选择" visible={visible} setVisible={setVisible} onConfirm={handleConfirm}>
          {data.map(chara => {
            return <CharaCard value={checked} key={chara.id} chara={chara} onClick={() => setChecked(chara.id)} />
          })}
        </AyDialog>
      )}
    </div>
  )
}
