var pool = require('./databaseConfig.js');
var sampahDB = {
    getuser: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
            console.log(err);
            return callback(err, null);
            }
            else {
            console.log("Connected!");
            var sql = 'SELECT * FROM tbuser';
            conn.query(sql, function (err, result) {
            conn.release();
            if (err) {
                console.log(err);
                return callback(err, null);
            } else {
                console.log(result);
                return callback(null, result);
            }
        });
        }
    });
    }
};
module.exports = sampahDB