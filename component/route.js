const url = require('url');

exports.route = (() => {
    let _link = '';
    let init = (link) => {
        _link = link;
    };
    let path = () => {
        let pn = url.parse(_link).pathname;
        if(pn !== null && pn !== undefined){
            return pn.slice(1, pn.length);
        }
        return null;
    };
    let query = () => {
        let q = url.parse(_link).query,
            arr,
            ret;
        if(q === null || q === undefined){
            return null;
        }
        arr = q.split('&');
        ret = [];
        if(arr !== null && arr !== undefined){
            arr.forEach((item)=>{
                ret.push({
                    name: item.split('=')[0],
                    value: item.split('=')[1]
                });
            });
        }
        return ret;
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