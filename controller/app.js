var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();

var path = require('path');

var cors = require("cors")

var cor = cors();
app.use(cor);
app.use(express.static(path.join(__dirname, "../public")));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*, content-type');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        return res.status(200).json({});
    }
    next();
});

var sampah = require('../model/trashcare.js');
var daftar = require('../model/daftar.js');
var user = require('../model/user.js');

app.get('/api/trashcare', function (req, res) {
    sampah.getsampah(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});
app.get('/api/trashcare/:nm_sampah', function (req, res) {
    var nm_sampah = req.params.nm_sampah;
    sampah.getsampahName(nm_sampah,function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.post('/api/trashcare/search', urlencodedParser, jsonParser, function (req, res) {
    const nm_sampah = req.body.nm_sampah;
    sampah.searchSampah(nm_sampah, function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.post('/api/trashcare', urlencodedParser, jsonParser, function (req, res) {
    var nm_sampah = req.body.nm_sampah;
    var deskripsi = req.body.deskripsi;
    var gambar = req.body.gambar;


    sampah.addsampah(nm_sampah, deskripsi, gambar, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan ');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

app.delete('/api/trashcare/:id', function (req, res) {
    var id = req.params.id;

    sampah.deletesampah(id, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' record dihapus');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }

    });
});

app.post('/api/trashcare/:id', urlencodedParser, jsonParser, function (req, res) {
    var nm_sampah = req.body.nm_sampah;
    var deskripsi = req.body.deskripsi;
    var gambar = req.body.gambar;
    var id = req.params.id;

    sampah.updatesampah(nm_sampah, deskripsi, gambar, id, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' record diubah ');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

app.get('/api/daftar', function (req, res) {
    daftar.getdaftar(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});

app.post('/api/daftar', urlencodedParser, jsonParser, function (req, res) {
    var nama_pelapor = req.body.nama_pelapor;
    var nama_daerah = req.body.nama_daerah;
    var dsk = req.body.dsk;


    daftar.adddaftar(nama_pelapor, nama_daerah, dsk, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan ');
        }
        else {
            console.log(err);
            res.status(500).send(err.code);
        }
    });
});

app.delete('/api/daftar/:id_daftar', function (req, res) {
    var id_daftar = req.params.id_daftar;

    daftar.deletedaftar(id_daftar, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' berhasil menghapus daftar');
        } else {
            console.log(err);
            res.status(500).send(err.code);
        }

    });
});

app.get('/api/user', function (req, res) {
    user.getuser(function (err, result) {
        if (!err) {
            res.send(result);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
});
module.exports = app