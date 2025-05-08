<template>
  <!-- 根据传入的参数 动态设置样式 -->
  <div :class="wrpCls">
    <!-- 控制显示用户头像的下拉菜单 -->
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
    <!-- 显示语言选择器 -->
    <select-lang :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: { // 这是子组件
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: { // 样式前缀
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: { // 判断移动设备 类型布尔值
      type: Boolean,
      default: () => false
    },
    topMenu: { // 是否显示顶部菜单
      type: Boolean,
      required: true
    },
    theme: { // 样式主题
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    wrpCls () { // 模板字符串动态设置类名
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: '陈蕊'
      }
    }, 1500)
  }
}
</script>
