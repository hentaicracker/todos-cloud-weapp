import Taro, { Component, Config } from '@tarojs/taro'
import { autobind } from 'core-decorators'
import { View, Text } from '@tarojs/components'
import {
  AtList,
  AtSwipeAction,
  AtListItem,
  AtModal,
  AtToast,
} from 'taro-ui'
import * as constant from '../../constant'
import { Todo, TodoStatus, Toast } from '../../interface'
import './index.scss'

export interface IndexState {
  dataSource: Todo[]
  showModal: boolean
  activeTodoId: string
  toast: Toast
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

  state = {
    activeTodoId: '',
    dataSource: [],
    showModal: false,
    toast: {
      show: false,
      text: '',
      duration: 2000,
    }
  }

  async componentDidMount () {
    this.getData()
  }

  componentDidShow () {
    if (this.state.dataSource.length) {
      this.getData()
    }
  }

  async getData () {
    const todos = await Taro.service.getTodos()
    this.setState({
      dataSource: todos
    })
  }

  handleAddBtnClick () {
    Taro.navigateTo({
      url: '/pages/detail/index'
    })
  }

  handleActionClick (id, e) {
    this.setState({
      activeTodoId: id,
    })
    const functions = {
      [`${constant.text.EDIT}`]: this.updateTodo.bind(this),
      [`${constant.text.DELETE}`]: this.deleteTodo.bind(this),
    }
    functions[e.text]()
  }

  updateTodo () {

  }

  deleteTodo () {
    this.setState({
      showModal: true
    })
  }

  handleModalClose () {
    this.setState({
      showModal: false
    })
  }

  async handleDeleteConfirm () {
    const res = await Taro.service.deleteTodo(this.state.activeTodoId)
    if (res) {
      this.setState({
        toast: {
          show: true,
          text: '删除成功',
          duration: 2000,
        }
      })
    }
  }

  render () {
    return (
      <View className='index'>
        <AtList>
          {
            this.state.dataSource.map((item, index) => (
              <AtSwipeAction
                key={index}
                onClick={this.handleActionClick.bind(this, item._id)}
                options={constant.actionOptions}
                autoClose
              >
                <AtListItem title={item.name}></AtListItem>
              </AtSwipeAction>
            ))
          }
        </AtList>

        <View className='index__add' onClick={this.handleAddBtnClick}> + </View>

        <AtModal
          isOpened={this.state.showModal}
          title='提示'
          cancelText='取消'
          confirmText='确认'
          onClose={this.handleModalClose.bind(this)}
          onCancel={this.handleModalClose.bind(this)}
          onConfirm={this.handleDeleteConfirm.bind(this)}
          content='您确定要删除吗？'
        />
        <AtToast
          isOpened={this.state.toast.show}
          text={this.state.toast.text}
          duration={this.state.toast.duration}
          status='success'
        />
      </View>
    )
  }
}

