module.exports = {
    devServer:{
        proxy:{
            '/api':{
                target:'http://192.168.43.82:3000/api',
                changeOrigin: true,
                pathRewrite:{
                    '^/api':''
                }
            },
            '/webservice':{
                target:'http://106.ihuyi.com/webservice/sms.php',
                changeOrigin: true,
            }
        }
    }
};