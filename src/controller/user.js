const userService = require('../service/user')

module.exports = {
  '/': (ctx, next) => {
    ctx.body = 'this is a user response!'
  },
  '/list': async (ctx, next) => {
    const list = await userService.getUserList()
    ctx.body = {list}
  },
  '/create/:firstName/:lastName?': async (ctx) => {
    const {firstName, lastName} = ctx.params
    ctx.body = await userService.createUser({
      firstName,
      lastName
    })
  },
  '/:id': async (ctx, next) => {
    const {id} = ctx.params
    try {
      const user = await userService.getUserById(Number(id))
      ctx.body = {user}
    } catch (e) {
      ctx.body = {code: -1, msg: '该用户不存在'}
    }
  }
}
