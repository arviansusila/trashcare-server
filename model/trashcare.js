var pool = require('./databaseConfig.js');
var sampahDB = {
    getsampah: function (callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tbsampah';
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

    getsampahName: function (nm_sampah, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tbsampah where nm_sampah = ?';
                conn.query(sql,[nm_sampah], function (err, result) {
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

    searchSampah: function (nm_sampah, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `SELECT * FROM tbsampah where nm_sampah LIKE \'%${nm_sampah}%\' `;
                conn.query(sql,[], function (err, result) {
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

    addsampah: function (nm_sampah, deskripsi, gambar, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);

            }
            else {
                console.log("Connectd!");
                var sql = 'INSERT INTO tbsampah (nm_sampah, deskripsi, gambar) values (?,?,?)';
                conn.query(sql, [nm_sampah, deskripsi, gambar], function (err, result) {
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

    deletesampah: function (id, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM tbsampah WHERE id=?';
                conn.query(sql, [id], function (err, result) {
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
    updatesampah: function (nm_sampah, deskripsi, gambar, id, callback) {
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(nm_sampah + ", " + deskripsi + ", " + gambar + "," + id)
                var sql = 'UPDATE tbsampah SET nm_sampah=?, deskripsi=?, gambar=? WHERE id=?';
                conn.query(sql, [nm_sampah, deskripsi, gambar, id], function (err, result) {
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