const url = require('url');

exports.route = (() => {
    let _link = '';
    let init = (link) => {
        _link = link;
    };
    let path = () => {
        let pn = url.parse(_link).pathname;
        if(pn !== null && pn !== undefined){
            pn = pn.split('/');
            return {
                module: pn[1] ? pn[1] : null,
                action: pn[2] ? pn[2] : null,
                args: pn[3] ? pn[3] : null
            };
        }
        return null;
    };
    return {
        init: function(link){
            init(link)
        },
        path: function(){
            return path()
        },
        query: function(){
            return query()
        }
    };
})();