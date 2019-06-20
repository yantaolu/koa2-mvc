module.exports = {
  '/': function(ctx, next) {
    ctx.body = 'this is a users response!'
  },
  '/bar': function(ctx, next) {
    ctx.body = 'this is a users/bar response'
  }
}
