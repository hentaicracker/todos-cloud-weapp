import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtSwipeAction, AtListItem } from 'taro-ui'
import * as constant from '../../constant'

import './index.scss'

interface Todo {
  name: string
  description: string
  done: boolean
  due: Date
}

interface IndexState {
  dataSource: Todo[]
}

export default class Index extends Component<{}, IndexState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state: {
    dataSource: Todo[]
  }

  componentWillMount () { }

  async componentDidMount () {
    const todos = await Taro.service.getTodos()
    this.setState({
      dataSource: todos
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleSingle () { }

  render () {
    return (
      <View className='index'>
        <AtList>
          {
            this.state.dataSource.map((item, index) => (
              <AtSwipeAction
                key={index}
                options={constant.actionOptions}
                autoClose
              >
                <AtListItem title={item.name}></AtListItem>
              </AtSwipeAction>
            ))
          }
        </AtList>
      </View>
    )
  }
}

