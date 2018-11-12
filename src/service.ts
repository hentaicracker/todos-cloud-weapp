import '@tarojs/async-await'

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
    console.log(todos)
    return todos
  }

  // async getTodos (): Promise<any> {
  //   const db = wx.cloud.database()
  //   const todos = await db.collection('todos').get()
  //   console.log(todos)
  //   return todos.data
  // }

}
