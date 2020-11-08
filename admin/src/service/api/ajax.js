import axios from 'axios'

export default function ajax(url = '',parmas = {},type = 'GET') {
    //1.变量
    let promise;

    //2.返回一个promise对象
    return new Promise((resolve,reject)=>{
        //2.1判断请求类型
        if (type.toUpperCase() === 'GET'){
            //2.2拼接字符串
            let parmaStr = '';
            //2.3遍历
            Object.keys(parmas).forEach((key)=>{
                parmaStr += key + '=' + parmas[key] + '&'
            });
            //2.4过滤最后的&
            if (parmaStr) {
                parmaStr = parmaStr.substr(0,parmaStr.lastIndexOf('&'));
                //2.5拼接完整路径
                url += '？' + parmaStr;
            }
            //2.6发起axios请求
            promise = axios.get(url);
        }
        else if (type.toUpperCase() === 'POST'){
            //2.7发起post请求
            promise = axios.post(url,parmas);
        }
        //2.8处理结果并返回
        promise.then((response)=>{
            resolve(response.data);
        }).catch(error=>{
            reject(error);
        })
    })
}