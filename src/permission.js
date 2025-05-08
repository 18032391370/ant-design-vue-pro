// 这是全局路由守卫
// 导包
import router, { resetRouter } from './router' // 引入路由实例以及用于重置路由的函数
import store from './store' // 引入 Vuex 状态管理
import storage from 'store' // 引入本地存储工具 保存和读取本地存储ACCESS_TOKEN
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification' // 提示错误信息
import { setDocumentTitle, domTitle } from '@/utils/domUtil' // 设置页面的标题
import { ACCESS_TOKEN } from '@/store/mutation-types' // 提取token
import { i18nRender } from '@/locales' // 国际化

// 禁用进度条的旋转动画
NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 无需身份验证的页面
const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login' // 登录页面路径
const defaultRoutePath = '/dashboard/workplace' // 默认跳转路径

router.beforeEach((to, from, next) => { // 目标路由,属性,跳转...
  NProgress.start() // 跳转前应先开启进度条
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
  /* has token */
  const token = storage.get(ACCESS_TOKEN) // 鉴权信息
  if (token) { // 检查是否登录
    if (to.path === loginRoutePath) {
      next({
        path: defaultRoutePath
      }) // 跳转...
      NProgress.done() // 结束进度条
    } else {
      // check login user.roles is null
      if (store.getters.roles.length === 0) { // 用户信息尚未加载
        // request login userInfo
        store
          .dispatch('GetInfo')
          .then(res => {
            console.log('res', res)
            // 根据用户权限信息生成可访问的路由表
            store.dispatch('GenerateRoutes', { token, ...res }).then(() => {
              // 动态添加可访问路由表
              // VueRouter@3.5.0+ New API
              resetRouter() // 重置路由 防止退出重新登录或者鉴权过期后页面未刷新，导致的路由重复添加
              store.getters.addRouters.forEach(r => {
                router.addRoute(r)
              })
              // 请求带有 redirect 重定向时，登录自动重定向到该地址
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 放行
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => { // 路由守卫
  NProgress.done() // finish progress bar
})
