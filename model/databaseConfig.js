var mysql = require ('mysql');
var dbconnect = mysql. createPool({
    host: "remotemysql.com",
    user: "vJXsthE8bb",
    password: "G0RUra6xkv",
    database: "vJXsthE8bb"
});
module.exports = dbconnect