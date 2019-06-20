const service = require('../service/index')

module.exports = {
  '/': async (ctx, next) => {
    await ctx.render('index', {
      title: 'Hello Koa-MVC!'
    })
  },
  '/string': async (ctx, next) => {
    ctx.body = 'koa2 string'
  },
  '/json': async (ctx, next) => {
    ctx.body = {
      title: 'koa2 json'
    }
  }
}

