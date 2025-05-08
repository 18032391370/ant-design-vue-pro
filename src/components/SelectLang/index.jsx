// 语言选择功能
import './index.less'

import { Icon, Menu, Dropdown } from 'ant-design-vue' // 显示图标 创建下拉菜单 实现下拉菜单弹出效果
import { i18nRender } from '@/locales' // 国际化
import i18nMixin from '@/store/i18n-mixin' // 国际化

const locales = ['zh-CN', 'en-US'] // 存放语言数组
const languageLabels = {
  // 语言显示名字
  'zh-CN': '简体中文',
  'en-US': 'English'
}
// eslint-disable-next-line
const languageIcons = {
  // 语言显示图标
  'zh-CN': '🇨🇳',
  'en-US': '🇺🇸'
}

const SelectLang = {
  props: {
    // 自定义样式前缀
    prefixCls: {
      type: String,
      default: 'ant-pro-drop-down'
    }
  },
  name: 'SelectLang', // 组件名称
  mixins: [i18nMixin], // ...
  render () {
    const { prefixCls } = this
    const changeLang = ({ key }) => {
      this.setLang(key)
    }
    const langMenu = (
      <Menu class={['menu', 'ant-pro-header-menu']} selectedKeys={[this.currentLang]} onClick={changeLang}>
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{' '}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    )
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <span class={prefixCls}>
          <Icon type="global" title={i18nRender('navBar.lang')} />
        </span>
      </Dropdown>
    )
  }
}

export default SelectLang
