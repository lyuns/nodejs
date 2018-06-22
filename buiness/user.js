
let util = require('util');

let db = require('../component/db').db;
let crypt = require('../component/crypt').crypt;

exports.user = (()=>{
    let login = (props) => {
        db.create('user', ()=>{});
        db.find('user', {name: props.post.name}, (res)=>{
            if(res !== undefined && res.length === 0){
                // 用户不存在，后续统一输出反馈
            }else{
                if(res[0].passwd === crypt.transMD5(props.post.passwd + ':' + res[0].salt)){
                    props.response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    props.response.write('登录成功！');
                    if(props.post.sessionId === undefined || props.post.sessionId.trim() === null){
                        props.response.write("客户端清空了sessionId");
                    }else if(props.sessionList.get(props.post.sessionId) === undefined || props.sessionList.get(props.post.sessionId) === null){
                        props.response.write("sessionId已过期或sessionId不正确");
                    }else{
                        props.response.write(util.inspect(props.sessionList.get(props.post.sessionId)));
                        props.sessionList.delete(props.post.sessionId);
                    }
                    props.response.end();
                    return;
                }
            }
            props.response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            props.response.write('用户名或密码错误！');
            props.response.end();
        });
    };
    let signup = (props) => {
        db.create('user', ()=>{});
        db.find('user', {name: props.post.name}, (res)=>{
            let randomSalt = crypt.getRandomSalt();
            if(res !== undefined && res.length === 0){
                db.insert('user', {name: props.post.name, passwd: crypt.transMD5(props.post.passwd + ':' + randomSalt), salt: randomSalt }, ()=>{});
                props.response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                props.response.write('恭喜您，已注册成功！');
                props.response.end();
            }else{
                props.response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                props.response.write('用户名已存在！');
                props.response.end();
            }
        });
    };
    let changepasswd = (props) => {
        db.create('user', ()=>{});
        db.find('user', {name: props.post.name}, (res)=>{
            if(res !== undefined && res.length === 0){
                props.response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                props.response.write('此账号不存在！');
                props.response.end();
            }else{
                let randomSalt = crypt.getRandomSalt();
                if(res[0].passwd === crypt.transMD5(props.post.oldpasswd + ':' + res[0].salt)){
                    db.updateOne('user', {name: props.post.name}, {name: props.post.name, passwd: crypt.transMD5(props.post.passwd + ':' + randomSalt), salt: randomSalt }, ()=>{});
                    props.response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    props.response.write('已重置密码！');
                    props.response.end();
                }else{
                    props.response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
                    props.response.write('旧密码不匹配！');
                    props.response.end();
                }
            }
        });
    };

    return {
        login: function(props){
            login(props)
        },
        signup: function(props){
            signup(props)
        },
        changepasswd: function(props){
            changepasswd(props)
        }
    };
})();