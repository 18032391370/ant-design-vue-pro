<template>
  <!-- 描述当前页面的功能场景 -->
  <!-- 包裹页面头部内容 -->
  <page-header-wrapper content="高级表单常见于一次性输入和提交大批量数据的场景">
    <!-- 这是卡片组件 -->
    <a-card class="card" title="仓库管理" :bordered="false">
      <repository-form ref="repository" :showSubmit="false" />
    </a-card>
    <a-card class="card" title="任务管理" :bordered="false">
      <task-form ref="task" :showSubmit="false" />
    </a-card>

    <!-- 信息表 -->
    <a-card>
      <!-- 展示成员信息的表格 -->
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <!-- 循环列表[成员姓名,工号,所属部门] -->
        <template v-for="(col, i) in ['name', 'workId', 'department']" :slot="col" slot-scope="text, record">
          <!-- 判断:为真渲染输入框 为假直接显示内容 -->
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </template>
        <!-- 操作列 -->
        <template slot="operation" slot-scope="text, record">
          <!-- 首先判断editable的布尔值 -->
          <template v-if="record.editable">
            <!-- 值为真显示'保存'和'取消' -->
            <span v-if="record.isNew">
              <!-- 点击添加 -->
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <!-- 点击删除逻辑 -->
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <!-- 点击编辑后逻辑 -->
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
          <!-- 值为假就显示编辑 -->
          <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <!--  -->
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增成员</a-button>
    </a-card>

    <!-- 固定底部工具栏 -->
    <footer-tool-bar :is-mobile="isMobile" :collapsed="sideCollapsed">
      <span class="popover-wrapper">
        <!-- 表单验证错误信息的弹出框 -->
        <a-popover title="表单校验信息" overlayClassName="antd-pro-pages-forms-style-errorPopover" trigger="click" :getPopupContainer="trigger => trigger.parentNode">
          <template slot="content">
            <li v-for="item in errors" :key="item.key" @click="scrollToField(item.key)" class="antd-pro-pages-forms-style-errorListItem">
              <a-icon type="cross-circle-o" class="antd-pro-pages-forms-style-errorIcon" />
              <div class="">{{ item.message }}</div>
              <div class="antd-pro-pages-forms-style-errorField">{{ item.fieldLabel }}</div>
            </li>
          </template>
          <span class="antd-pro-pages-forms-style-errorIcon" v-if="errors.length > 0">
            <a-icon type="exclamation-circle" />{{ errors.length }}
          </span>
        </a-popover>
      </span>
      <!-- 提交按钮 -->
      <a-button type="primary" @click="validate" :loading="loading">提交</a-button>
    </footer-tool-bar>
  </page-header-wrapper>
</template>

<script>
import RepositoryForm from './RepositoryForm'
import TaskForm from './TaskForm'
import FooterToolBar from '@/components/FooterToolbar'
import { baseMixin } from '@/store/app-mixin'

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型'
}

export default {
  name: 'AdvancedForm',
  mixins: [baseMixin],
  components: {
    FooterToolBar,
    RepositoryForm,
    TaskForm
  },
  data () {
    return {
      loading: false,
      memberLoading: false,

      // 表格的列信息
      columns: [
        {
          title: '成员姓名', // 列标题
          dataIndex: 'name', // 数据索引
          key: 'name',
          width: '20%', // 表宽
          scopedSlots: { customRender: 'name' } // 自定义渲染函数
        },
        {
          title: '工号',
          dataIndex: 'workId',
          key: 'workId',
          width: '20%',
          scopedSlots: { customRender: 'workId' }
        },
        {
          title: '所属部门',
          dataIndex: 'department',
          key: 'department',
          width: '40%',
          scopedSlots: { customRender: 'department' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      data: [ // 存储表格的数据
        {
          key: '1', // 索引
          name: '朱朝阳', // 姓名
          workId: '001', // 工号
          editable: false, // 不可编辑
          department: '行政部' // 部门
        },
        {
          key: '2',
          name: '岳普',
          workId: '002',
          editable: false,
          department: '财务部'
        },
        {
          key: '3',
          name: '严良',
          workId: '003',
          editable: false,
          department: 'IT部'
        }
      ],

      errors: [] // 用于存储表单验证错误信息
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
    },
    newMember () { // 新增一名成员
      const length = this.data.length
      this.data.push({
        key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
        name: '',
        workId: '',
        department: '',
        editable: true, // 可编辑
        isNew: true
      })
    },
    remove (key) { // 删除指定的成员行
      const newData = this.data.filter(item => item.key !== key)
      this.data = newData
    },
    saveRow (record) { // 保存一行数据
      this.memberLoading = true
      const { key, name, workId, department } = record
      if (!name || !workId || !department) { // 数据不够完整
        this.memberLoading = false
        this.$message.error('请填写完整成员信息。')
        return
      }
      // 模拟网络请求、卡顿 800ms
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({ loop: false })
        }, 800)
      }).then(() => {
        const target = this.data.find(item => item.key === key)
        target.editable = false
        target.isNew = false
        this.memberLoading = false
      })
    },
    toggle (key) { // 切换表格行的可编辑状态
      const target = this.data.find(item => item.key === key)
      target._originalData = { ...target } // 保存原始数据便于复原
      target.editable = !target.editable
    },
    getRowByKey (key, newData) {
      const data = this.data
      return (newData || data).find(item => item.key === key)
    },
    cancel (key) {
      const target = this.data.find(item => item.key === key)
      Object.keys(target).forEach(key => { target[key] = target._originalData[key] })
      target._originalData = undefined
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.find(item => key === item.key)
      if (target) {
        target[column] = value
        this.data = newData
      }
    },

    // 最终全页面提交
    validate () { // 触发表单验证
      const { $refs: { repository, task }, $notification } = this
      const repositoryForm = new Promise((resolve, reject) => {
        repository.form.validateFields((err, values) => {
          if (err) { // 报错
            reject(err)
            return
          }
          resolve(values) // 显示表单数据
        })
      })
      const taskForm = new Promise((resolve, reject) => {
        task.form.validateFields((err, values) => {
          if (err) {
            reject(err)
            return
          }
          resolve(values)
        })
      })

      // clean this.errors
      this.errors = []
      Promise.all([repositoryForm, taskForm]).then(values => {
        $notification['error']({
          message: 'Received values of form:',
          description: JSON.stringify(values)
        })
      }).catch(() => {
        const errors = Object.assign({}, repository.form.getFieldsError(), task.form.getFieldsError())
        const tmp = { ...errors }
        this.errorList(tmp)
      })
    },
    errorList (errors) { // 根据表单验证结果生成错误列表
      if (!errors || errors.length === 0) {
        return
      }
      this.errors = Object.keys(errors)
        .filter(key => errors[key])
        .map(key => ({
          key: key,
          message: errors[key][0],
          fieldLabel: fieldLabels[key]
        }))
    },
    scrollToField (fieldKey) { // 滚动到指定表单项的错误字段
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`)
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .card{
    margin-bottom: 24px;
  }
  .popover-wrapper {
    :deep(.antd-pro-pages-forms-style-errorPopover .ant-popover-inner-content) {
      min-width: 256px;
      max-height: 290px;
      padding: 0;
      overflow: auto;
    }
  }
  .antd-pro-pages-forms-style-errorIcon {
    user-select: none;
    margin-right: 24px;
    color: #f5222d;
    cursor: pointer;
    i {
          margin-right: 4px;
    }
  }
  .antd-pro-pages-forms-style-errorListItem {
    padding: 8px 16px;
    list-style: none;
    border-bottom: 1px solid #e8e8e8;
    cursor: pointer;
    transition: all .3s;

    &:hover {
      background: #e6f7ff;
    }
    .antd-pro-pages-forms-style-errorIcon {
      float: left;
      margin-top: 4px;
      margin-right: 12px;
      padding-bottom: 22px;
      color: #f5222d;
    }
    .antd-pro-pages-forms-style-errorField {
      margin-top: 2px;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }
  }
</style>
