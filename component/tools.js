
exports.tools = (() => {
    let random = '';
    let getRandom = (arr) => {
        random = Math.floor(Math.random()*(2821109907455-2901713047669)+2901713047669).toString(36);
        for(let item of arr){
            if(item === random){
                return getRandom(arr);
            }
        }
        return random;
    };
    return {
        getRandom: function(arr) {
            return getRandom(arr);
        }
    };
})();