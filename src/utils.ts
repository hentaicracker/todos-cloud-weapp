/**
 * 对象转querystring简版
 * @param obj 对象
 */
export function queryString (obj: Object) {
  const keys = Object.keys(obj)
  return keys.map(key => `${key}=${obj[key]}`).join('&')
}
