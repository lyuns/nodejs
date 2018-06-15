
const http = require('http'),
    querystring = require('querystring'),
    util = require('util');
const route = require('./component/route').route,
    dataservice = require('./component/dataservice').dataservice;

const onRequest = (request, response) => {
    route.init(request);

    let json_path = route.get_path();

    // 处理post数据
    let post = '';
    request.on('data', (chunk)=>{
        post += chunk;
    });
    request.on('end', ()=>{
        post = querystring.parse(post);
        dataservice.deal(response, json_path, post);
    });
};

http.createServer(onRequest).listen(8888);