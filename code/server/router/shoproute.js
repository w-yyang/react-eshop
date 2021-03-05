const express = require('express')

const shop = express.Router()

const connection = require('../model/connect')
const getQueryRes = require('../util/getquery')

shop.get('/showshop/:category', async (req, res) => {
    let category = req.params.category
    let queryStr = "SELECT * FROM shop WHERE category='" + category + "' LIMIT 4"
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        msg: '请求成功',
        data: result
    })
})

shop.get('/:category', async (req, res) => {
    let category = req.params.category
    let queryStr = "SELECT * FROM shop WHERE category='" + category + "'"
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        msg: '响应成功',
        data: result
    })
})

shop.get('/getoneshop/:shopid', async (req, res) => {
    let shopid = req.params.shopid
    let queryStr = "SELECT * FROM shop WHERE shopid=" + shopid
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        shopdata: result[0],
        msg: '数据请求成功'
    })
})

module.exports = shop