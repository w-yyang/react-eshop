const express = require('express')
const jwt = require('jsonwebtoken')

const login = express.Router()

const connection = require('../model/connect')
const getQueryRes = require('../util/getquery')

login.post('/login', async (req, res) => {
    let {username, password} = req.body
    let msg = ''
    let userinfo = {}
    if(username.trim() && password.trim()){
        let queryStr = "SELECT * FROM user WHERE username='" + username + "'"
        let result = await getQueryRes(connection, queryStr)
        if(password == result[0].password){
            //添加session或token
            msg = '登录成功'
            userinfo = {
                username: result[0].username,
                address: result[0].address,
                phone: result[0].phone,
                login: true
            }
            let token = jwt.sign({
                username: result[0].username
            },"wang",{
                expiresIn:60 * 60 //过期时间，按照秒算
            })
            // console.log('生成的token', token)
            res.send({
                code: 200,
                msg: msg,
                userinfo: userinfo,
                token
            })
            //前端利用localstorage存储token 同时，发送请求时需要携带token

            // res.cookie('username', result[0].username, {maxAge:60 * 60 * 1000 * 24})
            // console.log('设置', res.cookie)
        }else{
            msg = '登录失败'
            userinfo = {
                login: false
            }
        }
    }else{
        msg = '登录失败'
        res.send({
            code: 200,
            msg: msg,
            userinfo: userinfo
        })
    }
})


module.exports = login