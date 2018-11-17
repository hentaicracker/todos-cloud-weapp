import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import {
  AtForm,
  AtInput,
  AtTextarea,
  AtButton,
  AtToast,
} from 'taro-ui'
import * as constant from '../../constant'
import { Todo, TodoStatus, Toast } from '../../interface'

import './index.scss'

interface DetailState {
  todo: Todo,
  toast: Toast,
  isEdit: boolean,
}

export default class Index extends Component<{}, DetailState> {

  config: Config = {
    navigationBarTitleText: '详情'
  }

  state = {
    todo: {
      id: '',
      name: '',
      description: '',
      done: TodoStatus.doing,
      due: Date.now(),
    },
    toast: {
      show: false,
      text: '',
      duration: 2000,
    },
    isEdit: false,
  }

  componentWillMount () {
    const { _id, name, description, done, due } = this.$router.params
    if (_id) {
      this.setState({
        todo: {
          id: _id,
          name,
          description,
          done,
          due,
        },
        isEdit: true
      })
    }
  }

  async handleSubmit (e) {
    const { todo, toast, isEdit } = this.state
    let res
    if (isEdit) {
      res = await Taro.service.updateTodo(todo)
    } else {
      res = await Taro.service.addTodo(todo)
    }
    if (res) {
      toast.show = true
      toast.text = constant.text.ADD_SUCCESS
      this.setState({
        toast,
      }, () => {
        setTimeout(() => {
          Taro.navigateBack()
        }, toast.duration)
      })
    }
  }

  handleNameChange (val) {
    const todo = this.state.todo
    todo.name = val
    this.setState({
      todo,
    })
  }

  handleDescChange (event) {
    const todo = this.state.todo
    todo.description = event.target.value
    this.setState({
      todo,
    })
  }

  render () {
    const { todo, toast } = this.state
    return (
      <View className='detail'>
        <AtForm
          onSubmit={this.handleSubmit.bind(this)}
        >
          <View className='panel'>
            <View className='panel__title'>标题</View>
            <View className='panel__content'>
              <AtInput
                name='name'
                title=''
                type='text'
                placeholder=''
                value={todo.name}
                onChange={this.handleNameChange.bind(this)}
              />
            </View>
          </View>

          <View className='panel'>
            <View className='panel__title'>详细</View>
            <View className='panel__content'>
              <AtTextarea
                value={todo.description}
                onChange={this.handleDescChange.bind(this)}
                maxlength='200'
                placeholder='详细...'
              />
            </View>
          </View>

          <View className='detail__btn'>
            <AtButton type='primary' formType='submit'>提交</AtButton>
          </View>
        </AtForm>

        <AtToast
          isOpened={toast.show}
          text={toast.text}
          duration={toast.duration}
          status='success'
        />
      </View>
    )
  }
}

