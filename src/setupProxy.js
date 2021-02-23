const config = require('./config')

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${config.API_URL}:${config.API_PORT}`,
      changeOrigin: true,
    })
  )
}