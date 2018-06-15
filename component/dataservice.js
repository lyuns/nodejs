const path = require('path');

exports.dataservice = (()=>{
    let data = '';
    let deal = (response, json_path, post) => {
        data = post;
        try {
            if(json_path.module !== null && json_path.module !== undefined){
                let module = require(path.resolve(__dirname, '../buiness/', json_path.module) + '.js')[json_path.module];

                if(module !== null && module !== undefined && json_path.action !== null && json_path.action !== undefined){
                    module[json_path.action](response, json_path.args, post);
                }
            }
        }catch {
            response.write('404');
        }
        response.end();
    };

    return {
        deal: function(response, json_path, post){
            if(json_path === null || json_path === undefined) {
                response.end();
                return;
            }
            return deal(response, json_path, post);
        }
    };
})();