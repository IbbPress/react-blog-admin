const proxy = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/ibb/admin/v1/',
    proxy({
      target: 'http://39.106.12.170:7001',
      // target: 'http://127.0.0.1:7002',
      changeOrigin: true,
    })
  );
};