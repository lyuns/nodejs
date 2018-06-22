const path = require('path');

exports.dataservice = (()=>{
    let data = '';
    let deal = (props) => {
        data = props.post;
        try {
            if(props.json_path.module !== null && props.json_path.module !== undefined){
                let module = require(path.resolve(__dirname, '../buiness/', props.json_path.module) + '.js')[props.json_path.module];

                if(module !== null && module !== undefined && props.json_path.action !== null && props.json_path.action !== undefined){
                    module[props.json_path.action](props);
                }
            }
        }catch(e) {
            console.log(e);
            props.response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            props.response.write('404');
            props.response.end();
        }
    };

    return {
        deal: function(props){
            if(props.json_path === null || props.json_path === undefined) {
                props.response.end();
                return;
            }
            return deal(props);
        }
    };
})();