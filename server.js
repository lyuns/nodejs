
const http = require('http');
const route = require('./component/route').route;

const onLoad = (request, response) => {
    route.init(request.url);
    let json_path = route.path();

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(JSON.stringify(json_path));
    response.end();
};

http.createServer(onLoad).listen(8888);