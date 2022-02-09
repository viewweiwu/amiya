import React, { useState } from 'react'
import { Button, Col, Row } from 'antd'
import { AnyKeyProps, AyField, AyFields, AyForm } from 'amiya'
import { SettingFilled, RobotFilled, SoundFilled, BellFilled } from '@ant-design/icons'
import '../less/index.less'

const options = [
  {
    label: '账户',
    value: 'account',
    icon: <SettingFilled />
  },
  {
    label: '游戏',
    value: 'game',
    icon: <RobotFilled />
  },
  {
    label: '声音',
    value: 'voice',
    icon: <SoundFilled />
  },
  {
    label: '提醒',
    value: 'msg',
    icon: <BellFilled />
  }
]

const formProps: AnyKeyProps = {
  layout: {
    labelCol: {
      flex: '50%'
    },
    wrapperCol: {
      flex: 1
    }
  },
  labelAlign: 'left',
  props: { colon: false }
}

const switchProps = {
  type: 'switch',
  props: {
    size: 'large',
    checkedChildren: '开启',
    unCheckedChildren: '关闭'
  }
}

const switchRightProps = {
  type: 'switch',
  props: {
    ...switchProps.props,
    style: {
      float: 'right',
      marginRight: 24
    }
  }
}

const sliderProps = {
  props: {
    tooltipVisible: true,
    min: 0
  }
}

export default function Demo() {
  // 当前激活的 tab
  const [activeTab, setActiveTab] = useState<string>('account')

  return (
    <div className="arknights-setting">
      <Row className="page">
        <Col flex="100px" className="tabs">
          {/* tab 区域 */}
          {options.map(option => (
            <Button
              ghost
              key={option.value}
              icon={option.icon}
              className={activeTab === option.value ? 'active' : ''}
              onClick={() => setActiveTab(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </Col>
        <Col flex="1" className="content">
          {activeTab === options[0].value && (
            <AyForm {...formProps}>
              <AyFields key={options[0].value}>
                <AyField key="__t1" render={() => <div className="form-title first">账户信息</div>} />
                <AyField
                  title="账号换绑"
                  key="account-change"
                  type="custom"
                  renderContent={() => <Button className="form-btn">换绑</Button>}
                />
                <AyField
                  title="重置密码"
                  key="reset-password"
                  type="custom"
                  renderContent={() => <Button className="form-btn">重置密码</Button>}
                />
                <AyField
                  key="__t2"
                  render={() => <div className="form-title">《鹰角网络游戏使用许可及服务协议》</div>}
                />
                <AyField
                  title="账号换绑"
                  key="account-change"
                  type="custom"
                  renderContent={() => <Button className="form-btn">换绑</Button>}
                />
                <AyField key="__t3" render={() => <div className="form-title">其它</div>} />
                <AyField
                  title="退出登录"
                  key="account-logout"
                  type="custom"
                  renderContent={() => <Button className="form-btn">退出</Button>}
                />
              </AyFields>
            </AyForm>
          )}
          {activeTab === options[1].value && (
            <AyForm {...formProps}>
              <AyFields key={options[1].value}>
                <AyField key="__t1" render={() => <div className="form-title first">游戏设置</div>} />
                <AyField title="2 倍数保持" key="speed-fast" {...switchProps} help="开启后任何操作都将保持 2 倍数" />
                <AyField
                  title="长按倍速播放自动选择对话"
                  key="fast-msg"
                  {...switchProps}
                  help="开启后长按倍速播放时将自动选择第一条对话选项"
                />
                <AyField
                  title="动态形象相关设置"
                  key="idle"
                  type="radio-group"
                  props={{ optionType: 'button' }}
                  defaultValue={1}
                  options={[
                    { label: '开启', value: 1 },
                    { label: '进主页', value: 2 },
                    { label: '关闭', value: 0 }
                  ]}
                  help="仅对拥有动态形象的干员有效"
                />
                <AyField key="__t2" render={() => <div className="form-title">画面设置</div>} />
                <AyField
                  title="性能等级"
                  key="performance-level"
                  type="radio-group"
                  props={{ optionType: 'button' }}
                  defaultValue={3}
                  options={[
                    { label: '低画质', value: 1 },
                    { label: '中等画质', value: 2 },
                    { label: '高画质', value: 3 }
                  ]}
                  help="请注意，高画质会增加设备能耗并引起发热"
                />
                <AyField
                  title="帧率"
                  key="fps"
                  type="radio-group"
                  props={{ optionType: 'button' }}
                  defaultValue={1}
                  options={[
                    { label: '30 帧', value: 1 },
                    { label: '60 帧', value: 2 }
                  ]}
                  help="请注意，高帧率会增加设备能耗并引起发热"
                />
                <AyField
                  title="省电模式"
                  key="fps"
                  {...switchProps}
                  help="开启后，代理作战将使用较低画质与帧率，可减少耗电"
                />
                <AyField
                  title="异形屏UI适配"
                  key="screen"
                  type="slider"
                  props={{
                    ...sliderProps.props,
                    max: 120
                  }}
                  defaultValue={100}
                  help="数值为UI与屏幕两侧之间的距离"
                />
                <AyField key="__t3" render={() => <div className="form-title">追加资源</div>} />
                <AyField
                  title="视频资源"
                  key="reset-password"
                  type="custom"
                  renderContent={() => <Button className="form-btn disabled">已下载</Button>}
                />
                <AyField
                  title="语音资源"
                  key="reset-password"
                  type="custom"
                  renderContent={() => <Button className="form-btn disabled">已下载</Button>}
                />
                <AyField
                  title="动态形象"
                  key="reset-password"
                  type="custom"
                  renderContent={() => <Button className="form-btn disabled">已下载</Button>}
                />
              </AyFields>
            </AyForm>
          )}
          {activeTab === options[2].value && (
            <AyForm {...formProps}>
              <AyFields key={options[2].value}>
                <AyField key="__t1" render={() => <div className="form-title first">音量设置</div>} />
                <AyField title="音乐音量" span={12} key="bgm" {...switchRightProps} />
                <AyField span={12} defaultValue={60} key="bgm-volume" type="slider" {...sliderProps} />
                <AyField title="音效音量" span={12} key="bgs" {...switchRightProps} />
                <AyField span={12} defaultValue={60} key="bgs-volume" type="slider" {...sliderProps} />
                <AyField title="语音音量" span={12} key="bgv" {...switchRightProps} />
                <AyField span={12} defaultValue={60} key="bgv-volume" type="slider" {...sliderProps} />
                <AyField key="__t2" render={() => <div className="form-title">语音设置</div>} />
                <AyField
                  title="批量设置"
                  key="language"
                  type="radio-group"
                  props={{ optionType: 'button' }}
                  defaultValue={1}
                  options={[
                    { label: '中文-普通话', value: 1 },
                    { label: '日文', value: 2 }
                  ]}
                  help={
                    <span>
                      批量设置中文-普通话后，尚未支持中文-普通话配音的干员将使用日文/ 英文配音
                      <br />
                      *批量设置日文后，部分未支持中文-普通话、日文配音的干员将使用英文配音
                    </span>
                  }
                />
                <AyField
                  title="自定义语音"
                  key="language-custom"
                  type="custom"
                  formItemProps={{
                    style: {
                      marginTop: 28
                    }
                  }}
                  renderContent={() => <Button className="form-btn">设置</Button>}
                  help="自定义语音设置不包含联动干员"
                />
              </AyFields>
            </AyForm>
          )}
          {activeTab === options[3].value && (
            <AyForm {...formProps}>
              <AyFields key={options[3].value}>
                <AyField title="部署提示" key="tip-enter" {...switchProps} help="开启后部署干员会提示操作方法" />
                <AyField title="基建退出提示" key="tip-leave" {...switchProps} />
                <AyField title="制造站收货提示" key="tip-receiving" {...switchProps} />
                <AyField
                  title="制造站自动补货"
                  key="tip-replenishment"
                  {...switchProps}
                  help="开启状态下，制造站以任何方式收取无材料消耗配方制成的产品时，会进行自动补货"
                />
                <AyField title="贸易战交付系统" key="tip-deliver" {...switchProps} />
                <AyField title="干员疲劳统计" key="tip-fatigue" {...switchProps} />
              </AyFields>
            </AyForm>
          )}
        </Col>
      </Row>
    </div>
  )
}
