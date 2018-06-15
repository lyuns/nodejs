let db = require('../component/db').db;

exports.user = (()=>{
    let login = () => {
        console.log('login...');
        return null;
    };
    let signup = () => {

    };

    return {
        login: function(){
            login();
        },
        signup: function(){
            signup();
        }
    };
})();