const responseBody = {
  // 初始响应体模板
  message: '', // 存放返回消息
  timestamp: 0, // 记录请求时间
  result: null, // 实际返回数据
  code: 0 // 相应状态码 0是successd
}

export const builder = (data, message, code = 0, headers = {}) => { // 构造响应体的函数
  // 存相应内容、相应消息、相应状态码和额外头部信息(默认为空)
  responseBody.result = data
  if (message !== undefined && message !== null) { // 检查message存在且不为空
    responseBody.message = message // 赋值
  }
  if (code !== undefined && code !== 0) { // 如果传入了有效的状态码
    responseBody.code = code // 赋值
    responseBody._status = code // 其他状态字段
  }
  if (headers !== null && typeof headers === 'object' && Object.keys(headers).length > 0) {
    // 检查头部是否为非空对象且应至少包含一个键.值对
    responseBody._headers = headers // 条件满足 存储额外头部信息
  }
  responseBody.timestamp = new Date().getTime() // 获取当前时间的时间戳
  return responseBody // 返回内容
}

export const getQueryParameters = (options) => { // 从请求的URL中提取查询参数并解析为对象
  const url = options.url
  const search = url.split('?')[1] // 查询字符串 获取url中?后面的部分
  if (!search) { // 如果没查到就返回空对象
    return {}
  }
  // 查到了
  return JSON.parse('{"' + decodeURIComponent(search) // 解码并格式化对象格式 解析为js对象
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => { // 从请求中提取并解析请求体
  return options.body && JSON.parse(options.body) // 检查对象的属性是否存在(左真→执行右)
}
