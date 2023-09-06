require('./config/mongoose');
const express = require('express'); //import express js
const path = require('path');
var cors = require('cors'); // ini tambahan cors di akhir
var compression = require('compression');
const app = express(); //ini inisial
// const productRouter = require('./app/product/routes'); // ini inisial utk memapaki routes
// const productRouterV2 = require('./app/product_v2/routes');
const productRouterV3 = require('./app/product_v3/routes');
const productRouterV4 = require('./app/product_v4/routes');
// const log = require('./middleswares/logger');
const logger = require('morgan');

app.use(logger('dev')); // ini utk buat log agar muncul pesan status di terminal
app.use(cors()); // ini tambahan cors di akhir
app.use(compression()); //ini tambahan compression di akhir
app.use(express.urlencoded({extended: true})); // body parser utk form input html
app.use(express.json()); // body parsel utk json 
app.use('/public', express.static(path.join(__dirname, 'uploads')));
// app.use('/api/v1', productRouter); //ini utk router yg menuju ke routes.js
// app.use('/api/v2', productRouterV2);
app.use('/api/v3', productRouterV3);
app.use('/api/v4', productRouterV4);
app.use((req, res, next) => {   // ini utk handle status url not found
    res.status(404);
    res.send({
        status: 'failed', 
        message: 'Resource ' + req.originalUrl + ' Not Found'
    })
})
app.listen(3001, () => console.log('Server: http://localhost:3001')); //ini utk jalankan node js