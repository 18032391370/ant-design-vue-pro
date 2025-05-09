import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const totalCount = 5701

const serverList = (options) => {
  const parameters = getQueryParameters(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  const key = (pageNo - 1) * pageSize
  const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1

  for (let i = 1; i < next; i++) { // 此数据要传给“查询表格”前端页面
    // 每次循环将生成一个新对象并加入结果数组
    const tmpKey = key + i // 确保唯一性
    result.push({ // 将对象推入数组 逐个生成多个对象
      key: tmpKey, // 唯一标识符
      id: tmpKey, // 主键值
      no: 'No ' + tmpKey, // 编号字符串
      description: '这是一段描述', // 描述内容
      callNo: Mock.mock('@integer(1, 999)'), // 生成(1,999)之间的随机整数
      status: Mock.mock('@integer(0, 3)'), // 生成随机状态码 green-已上线 red-异常 grey-关闭 blue-运行中
      updatedAt: Mock.mock('@datetime'), // 随机生成时间日期字符串
      editable: false // 不可编辑
    })
  }

  return builder({ // 返回一个构造好的响应对象
    pageSize: pageSize, // 每页的数据条数
    pageNo: pageNo, // 当前页码
    totalCount: totalCount, // 数据总条数
    totalPage: totalPage, // 总页数
    data: result // 当前页展示的对象
  })
}

const projects = () => {
  return builder({ // id为主键标识符 cover缩略图地址 title标题 description说明 status状态 updatedAt最后更新时间
    'data': [{ // 创建对象 返回数据
      id: 1,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
      title: '示例標題',
      description: '白雲奉獻給草場 江河奉獻給海洋 我拿什麼奉獻給妳 我的朋友',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 2,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
      title: '示例標題',
      description: '我拿什麼奉獻給妳 我不停的問 我不停的找 不停的想',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 3,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
      title: '示例標題',
      description: '白鴿奉獻給藍天 星光奉獻給長夜 我拿什麼奉獻給你 我的小孩',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 4,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
      title: '示例標題',
      description: '我走了你別再難過 心裡有話都不想再說 記得以後你要快樂 這世界沒那麼多因果',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 5,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
      title: '示例標題',
      description: '幹嘛聽苦情歌以為多浪漫 再浪漫都被拆散 說要平平淡淡長路漫漫一起再共患難',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    },
    {
      id: 6,
      cover: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png',
      title: '示例標題',
      description: '如果抓得緊 不讓我走 怎麼會狼狽 這份愛 會不會 會不會',
      status: 1,
      updatedAt: '2018-07-26 00:00:00'
    }
    ],
    'pageSize': 10, // 每页的数据条数
    'pageNo': 0, // 当前页码
    'totalPage': 6, // 总页数
    'totalCount': 57 // 数据总条数
  })
}

const activity = () => {
  // 数据驱动
  return builder([{
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '@development team',
      action: 'updated',
      event: '@plan'
    },
    time: '1900-01-01 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '@development team',
      action: 'updated',
      event: '@plan'
    },
    time: '1900-01-01 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '@development team',
      action: 'created',
      event: '@plan'
    },
    time: '1900-01-01 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '@development team',
      action: 'updated',
      event: '@plan'
    },
    time: '1900-01-01 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '@development team',
      action: 'created',
      event: '@plan'
    },
    time: '1900-01-01 00:00:00'
  },
  {
    id: 1,
    user: {
      nickname: '@name',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
    },
    project: {
      name: '@development team',
      action: 'created',
      event: '@plan'
    },
    time: '1900-01-01 00:00:00'
  }
  ])
}

const teams = () => {
  return builder([{
    id: 1,
    name: 'teamName',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
  },
  {
    id: 2,
    name: 'teamName',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
  },
  {
    id: 1,
    name: 'teamName',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
  },
  {
    id: 1,
    name: 'teamName',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
  },
  {
    id: 1,
    name: 'teamName',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
  }
  ])
}

const radar = () => {
  return builder([{
    item: '引用',
    '个人': 70,
    '团队': 30,
    '部门': 40
  },
  {
    item: '口碑',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: '产量',
    '个人': 50,
    '团队': 60,
    '部门': 40
  },
  {
    item: '贡献',
    '个人': 40,
    '团队': 50,
    '部门': 40
  },
  {
    item: '热度',
    '个人': 60,
    '团队': 70,
    '部门': 40
  },
  {
    item: 'XX',
    '个人': 70,
    '团队': 50,
    '部门': 40
  }
  ])
}

Mock.mock(/\/service/, 'get', serverList)
Mock.mock(/\/list\/search\/projects/, 'get', projects)
Mock.mock(/\/workplace\/activity/, 'get', activity)
Mock.mock(/\/workplace\/teams/, 'get', teams)
Mock.mock(/\/workplace\/radar/, 'get', radar)
