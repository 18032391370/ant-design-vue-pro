<template>
  <div class="app-list">
    <!-- 列表 响应式布局 -->
    <a-list
      :grid="{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }"
      :dataSource="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-card :hoverable="true">
          <!-- 卡片组件 元数据 -->
          <a-card-meta>
            <!-- 标题 头像 描述 -->
            <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
            <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="small"/>
            <div class="meta-cardInfo" slot="description">
              <div>
                <p>活跃用户</p>
                <p>
                  <span>{{ item.activeUser }}<span>万</span></span>
                </p>
              </div>
              <div>
                <p>新增用户</p>
                <p>{{ item.newUser | NumberFormat }}</p>
              </div>
            </div>
          </a-card-meta>
          <!-- 卡片操作区域 -->
          <template class="ant-card-actions" slot="actions">
            <a>
              <a-icon type="download"/>
            </a>
            <a>
              <a-icon type="edit"/>
            </a>
            <a>
              <a-icon type="share-alt"/>
            </a>
            <a>
              <a-dropdown>
                <a class="ant-dropdown-link" href="javascript:;">
                  <a-icon type="ellipsis"/>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a href="javascript:;">菜单第一项</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">菜单第二项</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">菜单第三项</a>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a>
          </template>
        </a-card>
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
const dataSource = [] // 初始化空数组
for (let i = 0; i < 9; i++) { // 开始循环生成数据 一共11个
  dataSource.push({
    title: '产品名称', // 名字
    avatar: '../logo.png', // 图标
    activeUser: 0, // 活跃用户数量
    newUser: 0 // 新增用户数量
  })
}

export default {
  name: 'Article',
  components: {},
  data () {
    return {
      dataSource
    }
  }
}
</script>

<style lang="less" scoped>

  .app-list {

    .meta-cardInfo {
      zoom: 1;
      margin-top: 16px;

      > div {
        position: relative;
        text-align: left;
        float: left;
        width: 50%;

        p {
          line-height: 32px;
          font-size: 24px;
          margin: 0;

          &:first-child {
            color: rgba(0, 0, 0, .45);
            font-size: 12px;
            line-height: 20px;
            margin-bottom: 4px;
          }
        }

      }
    }
  }

</style>
