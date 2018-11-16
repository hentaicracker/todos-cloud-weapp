import cloud = require('wx-server-sdk')

export const main = async (event) => {
  const { name } = event

  cloud.init() // 初始化云平台

  const db = cloud.database()

  const collection = db.collection(name)

  let res
  try {
    res = await collection.get()
  } catch (e) {
    return {
      retCode: 1,
      retMsg: '系统错误'
    }
  }

  return {
    retCode: 0,
    data: res.data,
  }

}
