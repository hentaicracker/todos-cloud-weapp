import '@tarojs/async-await'
import { Todo } from './interface'

declare const wx: any

export default class {

  private env: string

  constructor (env) {
    this.env = env
    this.initService()
  }

  initService () {
    wx.cloud.init({
      env: this.env,
      traceUser: true,
    })
  }

  callFunction (name: string, data: any) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name,
        data,
      }).then(res => {
        if (res.result && res.result.retCode == 0) {
          resolve(res.result.data)
        } else {
          reject()
        }
      }).catch(err => {
        reject(err)
      })
    })
  }

  async getTodos (): Promise<any> {
    const todos = await this.callFunction('search', {
      name: 'todos'
    })
    return todos
  }

  async addTodo (todo: Todo): Promise<any> {
    const res = await this.callFunction('add', {
      name: 'todos',
      todo,
    })
    return res
  }

  async deleteTodo (id) {
    const res = await this.callFunction('delete', {
      name: 'todos',
      id,
    })
    return res
  }

  async updateTodo (todo: Todo) {
    const res = await this.callFunction('update', {
      name: 'todos',
      todo,
    })
    return res
  }

  // async getTodos (): Promise<any> {
  //   const db = wx.cloud.database()
  //   const todos = await db.collection('todos').get()
  //   console.log(todos)
  //   return todos.data
  // }

}
