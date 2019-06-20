const {sequelize, Sequelize, Model} = require('../utils/sequelize')

class User extends Model {
}

User.init({
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING
    // allowNull defaults to true
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: true
})

User.sync()

module.exports = User
