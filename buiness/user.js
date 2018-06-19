
let util = require('util');

let db = require('../component/db').db;
let crypt = require('../component/crypt').crypt;

exports.user = (()=>{
    let login = (response, arg, post) => {
        db.create('user', ()=>{});
        db.find('user', {name: post.name}, (res)=>{
            if(res !== undefined && res.length === 0){
                // 用户不存在，后续统一输出反馈
            }else{
                if(res[0].passwd === crypt.transMD5(post.passwd + ':' + res[0].salt)){
                    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    response.write('登录成功！');
                    response.end();
                    return;
                }
            }
            response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write('用户名或密码错误！');
            response.end();
        });
    };
    let signup = (response, arg, post) => {
        db.create('user', ()=>{});
        db.find('user', {name: post.name}, (res)=>{
            let randomSalt = crypt.getRandomSalt();
            if(res !== undefined && res.length === 0){
                db.insert('user', {name: post.name, passwd: crypt.transMD5(post.passwd + ':' + randomSalt), salt: randomSalt }, ()=>{});
                response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                response.write('恭喜您，已注册成功！');
                response.end();
            }else{
                response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                response.write('用户名已存在！');
                response.end();
            }
        });
    };
    let changepasswd = (response, arg, post) => {
        db.create('user', ()=>{});
        db.find('user', {name: post.name}, (res)=>{
            if(res !== undefined && res.length === 0){
                response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                response.write('此账号不存在！');
                response.end();
            }else{
                let randomSalt = crypt.getRandomSalt();
                if(res[0].passwd === crypt.transMD5(post.oldpasswd + ':' + res[0].salt)){
                    db.updateOne('user', {name: post.name}, {name: post.name, passwd: crypt.transMD5(post.passwd + ':' + randomSalt), salt: randomSalt }, ()=>{});
                    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    response.write('已重置密码！');
                    response.end();
                }else{
                    response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                    response.write('旧密码不匹配！');
                    response.end();
                }
            }
        });
    };

    return {
        login: function(response, arg, post){
            login(response, arg, post)
        },
        signup: function(response, arg, post){
            signup(response, arg, post)
        },
        changepasswd: function(response, arg, post){
            changepasswd(response, arg, post)
        }
    };
})();