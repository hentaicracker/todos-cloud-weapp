import cloud = require('wx-server-sdk')

export const main = async (event, context) => {
  const { id } = event

  cloud.init() // 初始化云平台

  const db = cloud.database()

  const collection = db.collection()



}
