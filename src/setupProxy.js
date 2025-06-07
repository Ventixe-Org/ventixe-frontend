const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api/events',
        createProxyMiddleware({
            target: 'http://localhost:5168',
            changeOrigin: true,
        })
    );
    app.use(
        '/api/registrations',
        createProxyMiddleware({
            target: 'http://localhost:5157',
            changeOrigin: true,
        })
    );
};
