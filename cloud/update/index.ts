import cloud = require('wx-server-sdk')

export const main = async (event) => {
  const { name, todo } = event

  todo.due = new Date(todo.due)

  cloud.init() // 初始化云平台

  const db = cloud.database()

  const collection = db.collection(name)

  let res
  try {
    res = await collection.doc(todo.id).update({
      data: todo
    })
  } catch (e) {
    return {
      retCode: 1,
      retMsg: '系统错误'
    }
  }

  return {
    retCode: 0,
    data: res,
  }

}
