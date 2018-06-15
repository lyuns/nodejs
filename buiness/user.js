let db = require('../component/db').db;
let util = require('util');

exports.user = (()=>{
    let login = (response, arg, post) => {
        if(post.name === 'lyuns' && post.pass === 'test'){
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write('登录成功！');
        }else{
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write('请检查用户名或密码！');
        }
    };
    let signup = (response, arg, post) => {
        response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        response.write('暂未开放！');
    };

    return {
        login: function(response, arg, post){
            login(response, arg, post);
        },
        signup: function(response, arg, post){
            signup(response, arg, post);
        }
    };
})();