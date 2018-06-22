const crypto = require('crypto');

exports.crypt = (() => {
    let randomSalt = () => {
        return Math.random().toString().slice(2,5);
    };
    let transMD5 = (passwd) => {
        return crypto.createHash('md5').update(passwd).digest('hex');
    };
    return {
        getRandomSalt: function(){
            return randomSalt();
        },
        transMD5: function(passwd){
            return transMD5(passwd);
        }
    };
})();