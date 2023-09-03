const express = require('express'); //import express js
const path = require('path');
var cors = require('cors'); // ini tambahan cors di akhir
var compression = require('compression');
const app = express(); //ini inisial
const router = require('./routes'); // ini inisial utk memapaki routes
const log = require('./middleswares/logger');

app.use(log); // ini utk buat log agar muncul pesan status di terminal
app.use(cors()); // ini tambahan cors di akhir
app.use(compression()); //ini tambahan compression di akhir
app.use(express.urlencoded({extended: true})); // body parser utk form input html
app.use(express.json()); // body parsel utk json 
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use(router); //ini utk router yg menuju ke routes.js
app.use((req, res, next) => {   // ini utk handle status url not found
    res.status(404);
    res.send({
        status: 'failed', 
        message: 'Resource ' + req.originalUrl + ' Not Found'
    })
})
app.listen(3000, () => console.log('Server: http://localhost:3000')); //ini utk jalankan node js