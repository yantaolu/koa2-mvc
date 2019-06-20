// 根据controllers解析对应的路由
// index.js controller 对应的根路径为"/"
// 其他controller对应的根路径为文件名（小写），建议使用"-"链接多个单词
const createRouter = require('koa-router')
const requireAll = require('require-all')

// 解析controllers
const controllers = requireAll({
  dirname: __dirname + '/src/controller',
  filter: /.+.js$/,
  map: function(name) {
    return name.replace(/\.js$/g, '').toLowerCase()
  }
})

// controllers 转换为 routers
const routers = []
Object.keys(controllers).forEach(con => {
  const router = createRouter()
  if (con !== 'index') {
    router.prefix(`/${con}`)
  }
  const controller = controllers[con]
  Object.keys(controller).forEach(path => {
    const reg = /^(head|options|get|put|patch|post|delete|del|all)(:|\s+)/i
    const result = path.match(reg)
    const method = result ? result[1].toLowerCase() : 'get'
    router[method](path.replace(reg, ''), controller[path])

    // console.log(method, path.replace(reg, ''))
  })
  routers.push(router)
})

module.exports = routers
