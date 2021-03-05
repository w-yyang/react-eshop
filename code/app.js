const express = require('express')
const path = require('path')
// const cookieParser = require('cookie-parser')

const app = express()

const shop = require('./server/router/shoproute')
const user = require('./server/router/userroute')
const cart = require('./server/router/cartroute')
const bill = require('./server/router/billroute')
const login = require('./server/router/loginroute')

var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,XFILENAME,XFILECATEGORY,XFILESIZE");;
    res.header("Access-Control-Allow-Methods", "*");
    // res.setHeader("Access-Control-Allow-Credentials", "true");//cookie跨域
    // res.header('Content-Type', 'application/json;charset=utf-8')
    next();
    // 服务器端 Access-Control-Allow-Credentials = true时，参数Access-Control-Allow-Origin 的值不能为 *
}

// app.use(allowCrossDomain);
// app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'server/public')))

app.use('/shop', shop)
app.use('/admin', require('./server/middleware/loginguard'));
app.use('/admin', login)
app.use('/admin/user', user)
app.use('/admin/cart', cart)
app.use('/admin/bill', bill)

app.listen(5000, () => {
    console.log('服务器启动成功')
})