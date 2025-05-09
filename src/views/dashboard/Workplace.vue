<template>
  <page-header-wrapper>
    <template v-slot:content>
      <!-- 页面头部 -->
      <div class="page-header-content">
        <!-- 页面最外层容器 -->
        <div class="avatar">
          <!-- 用户头像 -->
          <a-avatar size="large" :src="currentUser.avatar" />
        </div>
        <div class="content">
          <!-- 问候语 -->
          <div class="content-title">
            {{ timeFix }}，{{ user.name }}<span class="welcome-text">，{{ welcome }}</span>
          </div>
          <div>長路奉獻給遠方 玫瑰奉獻給愛情 我拿什麼奉獻給你 我的愛人</div>
        </div>
      </div>
    </template>
    <template v-slot:extraContent>
      <div class="extra-content">
        <!-- 头部右边内容 -->
        <div class="stat-item">
          <a-statistic title="项目数" :value="56" />
        </div>
        <div class="stat-item">
          <a-statistic title="团队内排名" :value="8" suffix="/ 24" />
        </div>
        <div class="stat-item">
          <a-statistic title="项目访问" :value="2223" />
        </div>
      </div>
    </template>

    <div>
      <!-- 中左 -->
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card
            class="project-list"
            :loading="loading"
            style="margin-bottom: 24px;"
            :bordered="false"
            title="进行中的项目"
            :body-style="{ padding: 0 }"
          >
            <a slot="extra">全部项目</a>
            <div>
              <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <!-- 通过manage.js传入数据循环表 -->
                <!-- 不显示输入框 -->
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                  <a-card-meta>
                    <div slot="title" class="card-title">
                      <a-avatar size="small" :src="item.cover" />
                      <a>{{ item.title }}</a>
                    </div>
                    <div slot="description" class="card-description">
                      {{ item.description }}
                    </div>
                  </a-card-meta>
                  <div class="project-item">
                    <!-- 固定的数据 -->
                    <a href="/#/">科学搬砖组</a>
                    <span class="datetime" data-time="2025-05-09T01:30:00Z"></span>
                  </div>
                </a-card>
              </a-card-grid>
            </div>
          </a-card>

          <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" size="small" :src="item.user.avatar" />
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span
                    >&nbsp; 在&nbsp;<a href="#">{{ item.project.name }}</a
                    >&nbsp; <span>{{ item.project.action }}</span
                    >&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <!-- 中右 -->
          <a-card
            title="快速开始 / 便捷导航"
            style="margin-bottom: 24px"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div class="item-group">
              <a>操作一</a>
              <a>操作二</a>
              <a>操作三</a>
              <a>操作四</a>
              <a>操作五</a>
              <a>操作六</a>
              <a-button size="small" type="primary" ghost icon="plus">添加</a-button>
            </div>
          </a-card>
          <a-card
            title="雷达图用于设置指数数据"
            style="margin-bottom: 24px"
            :loading="radarLoading"
            :bordered="false"
            :body-style="{ padding: 0 }"
          >
            <div style="min-height: 400px;">
              <!-- :scale="scale" :axis1Opts="axis1Opts" :axis2Opts="axis2Opts"  -->
              <radar :data="radarData" />
            </div>
          </a-card>
          <a-card :loading="loading" title="团队" :bordered="false">
            <div class="members">
              <a-row>
                <a-col :span="12" v-for="(item, index) in teams" :key="index">
                  <a>
                    <a-avatar size="small" :src="item.avatar" />
                    <span class="member">{{ item.name }}</span>
                  </a>
                </a-col>
              </a-row>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-header-wrapper>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'

import { getRoleList, getServiceList } from '@/api/manage'

const DataSet = require('@antv/data-set') // 引入蚂蚁数据可视化体系

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        // 雷达图数据
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '某某', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname,
      welcome: state => state.user.welcome
    }),
    currentUser () {
      return {
        // 名字和头像
        name: 'admin',
        avatar: '/avatar2.jpg'
      }
    },
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
    const resizeObserver = new ResizeObserver((entries) => {
      // 记录上次的尺寸变化
      const lastSize = { width: 0, height: 0 }
      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(() => {
        entries.forEach(entry => {
          const { width, height } = entry.contentRect
          // 只有当尺寸变化较大时才更新，避免无限循环
          if (Math.abs(width - lastSize.width) > 10 || Math.abs(height - lastSize.height) > 10) {
            lastSize.width = width
            lastSize.height = height
            console.log(`Size changed: Width = ${width}, Height = ${height}`)
          }
        })
      }, 300)
    })
    // 开始监听...
    resizeObserver.observe(document.querySelector('.your-element'))
  },
  mounted () { // 生命周期钩子 组件挂载完毕且在页面上显示
    this.getProjects()
    this.getActivity()
    this.getTeams()
    this.initRadar()
    this.$nextTick(() => {
      document.querySelectorAll('.datetime').forEach(el => {
        const time = el.getAttribute('data-time')
        el.textContent = this.timeAgo(time)
      })
    })
  },
  methods: {
    getProjects () {
      // 獲取項目數據
      this.$http.get('/list/search/projects').then(res => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity () {
      // 獲取用戶活動數據
      this.$http.get('/workplace/activity').then(res => {
        this.activities = res.result
      })
    },
    getTeams () {
      // 在页面加载时调用方法
      this.$http.get('/workplace/teams').then(res => { // 发送get请求(接口地址).返回数据后执行回调
        this.teams = res.result // 将返回的结果保存给组件使用
      })
    },
    initRadar () {
      this.radarLoading = true // 开始加载数据...

      this.$http.get('/workplace/radar').then(res => { // 发送get请求到接口 服务器返结果res
        const dv = new DataSet.View().source(res.result) // 将返回的数据传给数据转换工具库
        dv.transform({ // 开始转换数组(长→宽)...
          type: 'fold', // 折叠数据
          fields: ['个人', '团队', '部门'], // 要折叠的列名称
          key: 'user', // 用来存储字段名本身
          value: 'score' // 用来存储对应的值
        })

        this.radarData = dv.rows // 将处理好的数据赋给雷达图
        this.radarLoading = false // 内容呈现加载状态关闭...
      })
    },
    timeAgo (time) {
      const now = new Date()
      const past = new Date(time)
      const diff = Math.floor((now - past) / 1000) // 秒
      if (diff < 60) return `${diff}秒前`
      if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`
      if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`
      if (diff < 2592000) return `${Math.floor(diff / 86400)}天前`
      return past.toLocaleDateString()
    }
  }
}
</script>

<style lang="less" scoped>
@import './Workplace.less';

.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.members {
  a {
    display: block;
    margin: 12px 0;
    line-height: 24px;
    height: 24px;

    .member {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 24px;
      max-width: 100px;
      vertical-align: top;
      margin-left: 12px;
      transition: all 0.3s;
      display: inline-block;
    }

    &:hover {
      span {
        color: #1890ff;
      }
    }
  }
}

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
