const express = require('express')
const { query } = require('../model/connect')

const bill = express.Router()

const connection = require('../model/connect')
const getQueryRes = require('../util/getquery')

bill.get('/delbill/:id', async (req, res) => {
    const id = req.params.id
    var queryStr = 'DELETE FROM bill WHERE billid=' + id
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

bill.post('/buyshop', async (req, res) => {
    var data = req.body
    var queryStr = 'INSERT INTO bill SET ?'
    let buymsg = {
        date: data.date,
        username: data.username,
        shopname: data.shopname,
        price: data.price
    }
    let result = await getQueryRes(connection, queryStr, buymsg)
    res.send({
        code: 200,
        msg: '购买成功'
    })
})

bill.get('/', async (req, res) => {
    const username = req.query.username
    var queryStr = 'SELECT * FROM bill WHERE username=' + connection.escape(username)
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        billlist: result,
        msg: '获取成功'
    })
})

module.exports = bill