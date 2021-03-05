const mysql = require('mysql')

const sqlconfig = require('../config/sqlconfig')

const connection = mysql.createPool(sqlconfig)

module.exports = connection