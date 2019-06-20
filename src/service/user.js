const User = require('../model/user')

class UserService {
  constructor() {
  }

  async getUserList() {
    return await User.findAll()
  }

  async getUserById(id) {
    return User.findByPk(id)
  }

  async createUser(user) {
    return User.create(user)
  }
}

module.exports = new UserService()
