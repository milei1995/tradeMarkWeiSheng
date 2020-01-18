module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://trademark.hnmykj.vip', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}