<template>
  <a-form @submit="handleSubmit" :form="form" class="form">
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="任务名">
          <a-input placeholder="请输入任务名称" v-decorator="[ 'name2', {rules: [{ required: true, message: '请输入任务名称', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="任务描述">
          <a-input placeholder="请输入任务描述" v-decorator="[ 'url2', {rules: [{ required: true, message: '请输入任务描述', whitespace: true}]} ]" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="执行人">
          <a-select
            placeholder="请选择执行人"
            v-decorator="[
              'owner2',
              {rules: [{ required: true, message: '请选择执行人'}]}
            ]" >
            <a-select-option value="朱朝阳">朱朝阳</a-select-option>
            <a-select-option value="岳普">岳普</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row class="form-row" :gutter="16">
      <a-col :lg="6" :md="12" :sm="24">
        <a-form-item
          label="责任人">
          <a-select
            placeholder="请选择责任人"
            v-decorator="[
              'approver2',
              {rules: [{ required: true, message: '请选择责任人'}]}
            ]" >
            <a-select-option value="岳普">岳普</a-select-option>
            <a-select-option value="朱朝阳">朱朝阳</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 7, offset: 1}" :lg="{span: 8}" :md="{span: 12}" :sm="24">
        <a-form-item
          label="提醒时间">
          <a-time-picker
            style="width: 100%"
            v-decorator="[
              'dateRange2',
              {rules: [{ required: true, message: '请选择提醒时间'}]}
            ]" />
        </a-form-item>
      </a-col>
      <a-col :xl="{span: 9, offset: 1}" :lg="{span: 10}" :md="{span: 24}" :sm="24">
        <a-form-item
          label="任务类型">
          <a-select
            placeholder="请选择任务类型"
            v-decorator="[ 'type2', {rules: [{ required: true, message: '请选择任务类型'}]} ]" >
            <a-select-option value="定时执行">定时执行</a-select-option>
            <a-select-option value="周期执行">周期执行</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-form-item v-if="showSubmit">
      <a-button htmlType="submit" >Submit</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'TaskForm',
  props: {
    showSubmit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$notification['error']({
            message: 'Received values of form:',
            description: values
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
