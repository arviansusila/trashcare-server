var pool = require('./databaseConfig.js');
var sampahDB = {
    getdaftar: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tbdaftar';
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
    },
    adddaftar: function (nama_pelapor, nama_daerah, dsk, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);

            }
            else {
                console.log("Connectd!");
                var sql = 'INSERT INTO tbdaftar (nama_pelapor, nama_daerah, dsk) values (?,?,?)';
                conn.query(sql, [nama_pelapor, nama_daerah, dsk], function (err, result) {
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
    ,

    deletedaftar: function (id_daftar, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM tbdaftar WHERE id_daftar=?';
                conn.query(sql, [id_daftar], function (err, result) {
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