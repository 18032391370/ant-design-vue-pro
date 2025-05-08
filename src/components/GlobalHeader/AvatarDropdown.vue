<template>
  <!-- 下拉菜单 位置右下方 -->
  <a-dropdown v-if="currentUser && currentUser.name" placement="bottomRight">
    <!-- 账户头像容器 -->
    <span class="ant-pro-account-avatar">
      <!-- 小头像 -->
      <a-avatar size="small" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" class="antd-pro-global-header-index-avatar" />
      <!-- 传入用户名 -->
      <span>{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <!-- 下拉菜单项 -->
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="center" @click="handleToCenter">
          <a-icon type="user" />
          {{ $t('menu.account.center') }}
        </a-menu-item>
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          {{ $t('menu.account.settings') }}
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          {{ $t('menu.account.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <!-- 加载用户信息的动画 -->
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: { // 传入当前用户的对象
      type: Object,
      default: () => null // 显示加载动画
    },
    menu: {
      type: Boolean,
      default: true // 显示菜单项
    }
  },
  methods: {
    handleToCenter () { // 跳转个人中心页面
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings () { // 跳转设置页面
      this.$router.push({ path: '/account/settings' })
    },
    handleLogout (e) { // 登出提示框
      Modal.confirm({ // 显示确认框
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => { // 点击确认
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => { // 调用登出逻辑跳转到登录页面
            this.$router.push({ name: 'login' })
          })
        },
        onCancel () {}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  :deep(.action) {
    margin-right: 8px;
  }
  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
