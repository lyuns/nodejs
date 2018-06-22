
const util = require('util');

const db = require('../component/db').db;
const crypt = require('../component/crypt').crypt;
const tools = require('../component/tools').tools;

let verifyCode = (props) => {
    if(props.post.sessionId === undefined || props.post.sessionId.trim() === null){
        //客户端清空了sessionId
        return false;
    }else if(props.sessionList.get(props.post.sessionId) === undefined || props.sessionList.get(props.post.sessionId) === null){
        //sessionId已过期或sessionId不正确
        return false;
    }else{
        if(props.post.verifyCode !== undefined && props.sessionList.get(props.post.sessionId).code.toString() === props.post.verifyCode.toString()){
            props.sessionList.delete(props.post.sessionId);
            return true;
        }
        // sessionId或验证码不正确
        return false;
    }
}

exports.user = (()=>{
    let login = (props) => {
        db.create('user', ()=>{});
        db.find('user', {name: props.post.name}, (res)=>{
            if(res !== undefined && res.length === 0){
                // 用户不存在，后续统一输出反馈
            }else{
                if(res[0].passwd === crypt.transMD5(props.post.passwd + ':' + res[0].salt)){
                    let userStatusCode = tools.getRandom(((props)=>{
                        let arr = [];
                        for(let [key, value] of props.sessionList){
                            arr.push(key);
                        }
                        return arr;
                    })(props));
                    let code = parseInt(Math.random()*9000+1000);
                    props.sessionList.set(userStatusCode, {code, delay: 1*60*60*24});
                    props.response.writeHead(200, {
                        'Set-Cookie': 'userStatus=' + code + ';expires=' + new Date(Date.now()+1000*60*60*24).toGMTString(),
                        'Content-Type': 'text/html; charset=utf-8'
                    });
                    props.response.write('登录成功！');
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
        if(!verifyCode(props)){
            props.response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            props.response.write('图片验证码错误！');
            props.response.end();
            return;
        }
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
        if(!verifyCode(props)){
            props.response.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
            props.response.write('图片验证码错误！');
            props.response.end();
            return;
        }
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