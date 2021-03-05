const express = require('express')

const cart = express.Router()

const connection = require('../model/connect')
const getQueryRes = require('../util/getquery')

cart.post('/getcartlist', async (req, res) => {
    var username = req.body.username
    var queryStr = 'SELECT * FROM cart WHERE username=' + connection.escape(username)
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        cartlist: result,
        msg: '查找成功'
    })
})

cart.post('/addtocart', async (req, res) => {
    var {username, shopname, shopid, price, category, imgurl} = req.body
    var findSame = `SELECT * FROM cart WHERE username='${username}' AND shopname='${shopname}'`
    let findRes = await getQueryRes(connection, findSame)
    let msg = ''
    if(findRes.length == 0){
        var addMsg = {
            username, 
            shopname, 
            shopid, 
            price,
            category,
            imgurl
        }
        var queryStr = 'INSERT INTO cart SET ?'
        let result = await getQueryRes(connection, queryStr, addMsg)
        msg = '添加成功'
    }else{
        msg = '已添加过'
    }
    res.send({
        code: 200,
        msg: msg
    })
})

cart.get('/delcartmsg/:id', async (req, res) => {
    let cartid = req.params.id
    var queryStr = 'DELETE FROM cart WHERE cartid=' + cartid
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        msg: '删除成功'
    })
})

module.exports = cart