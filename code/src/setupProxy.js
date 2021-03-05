const {createProxyMiddleware} = require('http-proxy-middleware');
 
module.exports = function (app) {
  app.use(
      createProxyMiddleware(
          '/api',
          {
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
          }
      )
  );
};

// "proxy": {
//     "/api": {
//       "target": "http://localhost:5000",
//       "changeOrigin": true,
//       "pathRewrite": {
//         "^/api": ""
//       }
//     }
//   }