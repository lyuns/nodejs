const captchapng = require('captchapng');

const tools = require('../component/tools').tools;

exports.verification = (()=>{
    let generateCodePng = (props) => {
        let sessionId = tools.getRandom(((props)=>{
            let arr = [];
            for(let [key, value] of props.sessionList){
                arr.push(key);
            }
            return arr;
        })(props));
        let code = parseInt(Math.random()*9000+1000);
        // 保存验证码
        props.sessionList.set(sessionId, {code, delay: 1*60*60});
        let p = new captchapng(80,30,code);
        p.color(0,0,0,0);
        p.color(80,80,80,255);

        let img = p.getBase64();
        let imgbase64 = new Buffer(img, 'base64');
        props.response.writeHead(200, {
            'Set-Cookie': 'sessionId=' + sessionId + ';expires=' + new Date(Date.now()+1000*60*60).toGMTString(),
            'Content-Type': 'image/png'
        });
        props.response.end(imgbase64);
    };

    return {
        generateCodePng: function(props){
            return generateCodePng(props);
        }
    };
})();