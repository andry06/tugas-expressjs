const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {                 //ini utk home page
    res.send({
        status: 'Successfully',
        message: 'Welcome to express.js tutorial',
        author: 'Andri Suryono'
    });
});

router.get('/barang', (req, res, next) => {           // ini utk menangani url/barang/?page=3&total=2
    const { page, total } = req.query;
    res.send({
        status: 'Successfully',
        message: 'Master Data Barang',
        page,
        total
    });
});

router.get('/product/:id', (req, res) => {    //ini utk menanga url contoh /product/2
    res.json({
        id: req.params.id,
        name: 'Buku Tulis',
        price: 3000,
        stock: 10
    });
});

router.post('/product/', upload.single('image'), (req, res) => {      // ini utk menangani post
    const { name, price, stock, status } = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, 'uploads', image.originalname);
        fs.renameSync(image.path, target);
        // res.json({           //ini utk kirim respon json
        //     name,
        //     price,
        //     stock,
        //     status,
        //     image
        // });
        res.sendFile(target);   // ini utk kirim respon gambar agar jalan
    }
});

// router.get('/:category/:tag', (req, res) => {       //ini utk menangani contoh masukin categorinya_apa/tagnya_apa
//     const { category, tag } = req.params;
//     res.json({ category, tag });
// });


module.exports = router;