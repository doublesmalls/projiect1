import querystring from 'querystring'
//处理post请求
export default (req,res,next)=>{
    //1.过滤get请求
    if (req.method.toLowerCase() === 'get'){
        return next()
    }


    //2.如果是普通的表单提交，要处理 ,application/x-www-form-urlencoded
    //如果含有（文件，图片，。。。），不处理,multpart/form-data
    if (req.headers['content-type'].startsWith('multipart/form-data')){
        return next()
    }

    let data = '';
    req.on('data',(chunk)=>{
        data += chunk;
    });
    req.on('end',()=>{
        console.log(data);
        req.body = querystring.parse(data);
        next();
    })

}