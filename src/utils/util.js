export function timeFix () {
  // 时间问候函数
  const time = new Date()
  const hour = time.getHours()
  // 位于名字之前
  return hour < 6 ? '夜深了' : hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

// 提示语 位于名字之后
export function welcome () {
  const arr = [
    '成功不是终点 而失败并不致命 有勇气继续下去才是最重要的',
    '只有努力寻找成功 才能获得成功',
    '这个世界上 坚持不懈是无可替代的',
    '成功是内心的宁静 是自我满足的结果'
  ]
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
// 在窗口大小改变时触发事件
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents') // 创建一个新的HTML事件
  event.initEvent('resize', true, true) // 初始化事件 类型为resize 设置事件冒泡、取消
  event.eventType = 'message'
  window.dispatchEvent(event) // 触发所有监听resize事件的回调函数
}

export function handleScrollHeader (callback) {
  // 监听滚动事件并判断滚动方向 停止滚动后调用回调函数并传入滚动方向
  let timer = 0

  let beforeScrollTop = window.pageYOffset // 记录上一次滚动的位置
  callback = callback || function () {} // 设置回调函数默认为空函数
  window.addEventListener( // 监听滚动事件
    'scroll',
    event => {
      clearTimeout(timer) // 清除上一次的定时器
      timer = setTimeout(() => { // 设置定时器
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop // 计算本次和上次滚动的位置差值判断滚动方向
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

// 用于判断用户浏览器是否为ie浏览器
export function isIE () {
  const bw = window.navigator.userAgent // 获取浏览器的用户代理信息
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)() // 单独检测IE11浏览器
  return compare('MSIE') || ie11 // 检查用户代理
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  // 移除页面上的加载动画
  if (id === '') { // 传入元素ID 默认值为空字符串
    return
  }
  setTimeout(() => { // 设置延迟操作
    document.body.removeChild(document.getElementById(id))
  }, timeout) // 延迟删除的时间
}
export function scorePassword (pass) { // 计算密码的强度
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {} // 记录密码中每个字符的出现次数
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = { // 记录密码是否包含数字、小写字母、大写字母和非字母字符
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0 // 统计密码中不同种类的字符类型
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  // 最终通过字符种类和字符重复次数的组合计算一个强度分数
  score += (variationCount - 1) * 10

  return parseInt(score)
}
