const path = require('path');

const db = require('./db').db;

exports.dataservice = (()=>{
    let data = '';
    let deal = (json_path, post) => {
        data = post;
        if(json_path.module !== null && json_path.module !== undefined){
            let module = require(path.resolve(__dirname, '../buiness/', json_path.module) + '.js')[json_path.module];

            if(module !== null && module !== undefined && json_path.action !== null && json_path.action !== undefined){
                return module[json_path.action](json_path.args);
            }
        }
    };

    return {
        deal: function(json_path, post){
            if(json_path === null || json_path === undefined) {
                return null;
            }
            return deal(json_path, post);
        }
    };
})();