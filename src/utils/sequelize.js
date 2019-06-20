const Sequelize = require('sequelize')
const {mysql} = require('../../config/db-config')
const {user, password, host, port, database} = mysql
const {decrypt} = require('./aes')

const sequelize = new Sequelize(database, user, decrypt(password), {
  host,
  port,
  dialect: 'mysql'
})

module.exports = {
  sequelize,
  Sequelize,
  Model: Sequelize.Model
}
