const express = require('express')

const user = express.Router()

const connection = require('../model/connect')
const getQueryRes = require('../util/getquery')

user.post('/getusermsg', async (req, res) => {
    const {username} = req.body
    var queryStr = 'SELECT * FROM user WHERE username=' + connection.escape(username)
    //名字嵌入可能有问题
    let userdata = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        usermsg: userdata[0],
        msg: '获取成功'
    })
})

user.post('/adduser', async (req, res) => {
    const {username, password, phone, address} = req.body
    let msg = ''
    if(username.trim() && password.trim()){
        let searchSame = 'SELECT username FROM user WHERE username=' + connection.escape(username)
        let ans = await getQueryRes(connection, searchSame)
        if(ans.length != 0){
            msg = '用户名已占用'
        }else{
            let queryStr = 'INSERT INTO user SET ?'
            let newuser = {
                username: username,
                password: password,
                phone: phone,
                address: address
            }
            let result = await getQueryRes(connection, queryStr, newuser)
            msg = '注册成功'
        }
    }else{
        msg = '用户名或密码不能为空'
    }
    res.send({
        code: 200,
        msg: msg
    })
})

user.post('/altermsg', async (req, res) => {
    let {username, phone, address} = req.body
    var queryStr = `UPDATE user SET phone=${phone}, address='${address}' WHERE username=` + connection.escape(username)
    let result = await getQueryRes(connection, queryStr)
    res.send({
        code: 200,
        msg: '更改成功'
    })
})

module.exports = user