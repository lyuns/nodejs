
const http = require('http'),
    querystring = require('querystring'),
    util = require('util');
const route = require('./component/route').route;

const onLoad = (request, response) => {
    route.init(request);
    let json_path = route.get_path();

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(JSON.stringify(json_path));
    response.end();
};

const onPost = (request, response) => {
    route.init(request);
    let post = '';

    request.on('data', (chunk)=>{
        post += chunk;
    });

    request.on('end', ()=>{
        post = querystring.parse(post);
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        if(post.name){
            response.write('名字是：' + post.name)
            response.write("<br>")
        }
        response.write(util.inspect(route.get_path()));
        response.write("<br>")
        response.write('响应结尾！');
        response.end()
    });
};

http.createServer(onPost).listen(8888);