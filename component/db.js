const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://conn:mongoconn@localhost:27017/foo";

let dbname = 'foo';

exports.db = (()=>{
    let create = (collect, callback) => {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.createCollection(collect, () => {
                if (err) {
                    throw err;
                }
                callback();
                db.close();
            });
        });
    };
    let find = (collect, data, callback) => {
        MongoClient.connect(url, (err, db)=>{
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.collection(collect).find(data).toArray((err, res)=>{
                if (err) {
                    throw err;
                }
                callback(res);
                db.close();
            });
        });
    };
    let insert = (collect, data, callback) => {
        MongoClient.connect(url, (err, db)=>{
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.collection(collect).insertOne(data, (err, res)=>{
                if (err) {
                    throw err;
                }
                callback();
                db.close();
            });
        });
    };
    let deleteOne = (collect, data, callback) => {
        MongoClient.connect(url, (err, db)=>{
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.collection(collect).deleteOne(data, (err, res)=>{
                if (err) {
                    throw err;
                }
                callback();
                db.close();
            });
        });
    };
    let deleteMany = (collect, data, callback) => {
        MongoClient.connect(url, (err, db)=>{
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.collection(collect).deleteMany(data, (err, res)=>{
                if (err) {
                    throw err;
                }
                callback();
                db.close();
            });
        });
    };
    let updateOne = (collect, olddata, data, callback) => {
        MongoClient.connect(url, (err, db)=>{
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.collection(collect).updateOne(olddata, {$set: data}, (err, res)=>{
                if (err) {
                    throw err;
                }
                callback();
                db.close();
            });
        });
    };
    let updateMany = (collect, olddata, data, callback) => {
        MongoClient.connect(url, (err, db)=>{
            if (err) throw err;
            let dbase = db.db(dbname);
            dbase.collection(collect).updateMany(olddata, {$set: data}, (err, res)=>{
                if (err) {
                    throw err;
                }
                callback();
                db.close();
            });
        });
    };
    return {
        create: function(collect, callback){
            create(collect, callback);
        },
        find: function(collect, data, callback){
            find(collect, data, callback);
        },
        insert: function(collect, data, callback){
            insert(collect, data, callback);
        },
        deleteOne: function(collect, data, callback) {
            deleteOne(collect, data, callback);
        },
        deleteMany: function(collect, data, callback) {
            deleteMany(collect, data, callback);
        },
        updateOne: function(collect, olddata, data, callback){
            updateOne(collect, olddata, data, callback);
        },
        updateMany: function(collect, olddata, data, callback){
            updateOne(collect, olddata, data, callback);
        },
    };
})();