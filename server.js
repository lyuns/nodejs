
const http = require('http'),
    querystring = require('querystring'),
    util = require('util');
const route = require('./component/route').route,
    dataservice = require('./component/dataservice').dataservice;

const sessionList = new Map();

// 自动回收session
(function(){
    setInterval(()=>{
        for(let [key, value] of sessionList){
            if(value.delay === undefined || value.delay === null){
                continue;
            }
            if(parseInt(value.delay) < 0){
                sessionList.delete(key);
            }
            value.delay -= 60;
        }
    }, 1000*60);
}());

const onRequest = (request, response) => {
    // request.session.code = 'sdfds';
    route.init(request);

    // 同时过滤浏览器对于ico图标的请求
    let json_path = route.get_path();

    // 处理post数据
    let post = '';
    request.on('data', (chunk)=>{
        post += chunk;
    });
    request.on('end', ()=>{
        post = querystring.parse(post);
        dataservice.deal({
            response,
            json_path,
            post,
            sessionList
        });
    });
};

http.createServer(onRequest).listen(8888);