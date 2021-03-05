const jwt = require('jsonwebtoken')

const guard = (req, res, next) => {
	// console.log('检查', req.cookies, req.url)
	let token = req.query.token || req.body.token || req.headers.token
	// console.log('传过来的token', token)
	if(req.url == '/login' || req.url == '/user/adduser'){
		next()
	}else{
        jwt.verify(token,"wang",(err,decode) => { 
			if(!err){
				next()
			}else{
				res.send('token数据已过期')
			}
		})
	}
}

module.exports = guard