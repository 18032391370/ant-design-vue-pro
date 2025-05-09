<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <!-- 当前组件将渲染到指定插槽 -->
        <span slot="description">
          <!-- 列表项描述 -->
          <span class="security-list-description">{{ item.description }}</span>
          <!-- 渲染冒号 -->
          <span v-if="item.value"> : </span>
          <!-- 列表项的值 -->
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <!-- 判断渲染包含操作按钮的模板 -->
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
  </a-list>
</template>

<script>
export default {
computed: {
    data () {
        return [
          // 密码、手机号码、密保问题、电子邮箱、MFA设备
        { title: this.$t('account.settings.security.password'), description: this.$t('account.settings.security.password-description'), value: '强', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.info('This is a normal message') } } },
        { title: this.$t('account.settings.security.phone'), description: this.$t('account.settings.security.phone-description'), value: '138****8293', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.success('This is a message of success') } } },
        { title: this.$t('account.settings.security.question'), description: this.$t('account.settings.security.question-description'), value: '', actions: { title: this.$t('account.settings.security.set'), callback: () => { this.$message.error('This is a message of error') } } },
        { title: this.$t('account.settings.security.email'), description: this.$t('account.settings.security.email-description'), value: 'ant***sign.com', actions: { title: this.$t('account.settings.security.modify'), callback: () => { this.$message.warning('This is message of warning') } } },
        { title: this.$t('account.settings.security.mfa'), description: this.$t('account.settings.security.mfa-description'), value: '', actions: { title: this.$t('account.settings.security.bind'), callback: () => { this.$message.info('This is a normal message') } } }
      ]
    }
  }
}
</script>

<style scoped>

</style>
