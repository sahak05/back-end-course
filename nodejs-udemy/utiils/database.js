const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', '@A0j5a0o5', {dialect: 'mysql', host:'localhost'})

module.exports = sequelize;