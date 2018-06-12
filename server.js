
const url = require('url');
const http = require('http');
const route = require('./component/route').route;

const onLoad = (request, response) => {
    route.init(request.url);
    let curpath = route.path();
    let query = route.query();
    if(query !== null && query !== undefined){
        curpath += '?';
        query.forEach((item)=>{
            curpath = curpath + item['name'] + '=' + item['value'] + '&'
        });
    }
    curpath = curpath.slice(0, curpath.length-1);

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(curpath);
    response.end();
};

http.createServer(onLoad).listen(8888);