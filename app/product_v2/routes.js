const router = require('express').Router();
// const Product = require('./model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = multer({dest: 'uploads'});
const productControllerV2 = require('./controller');

router.get('/product', productControllerV2.index);
router.post('/product', upload.single('image'), productControllerV2.store);
router.get('/product/:id', productControllerV2.show);
router.put('/product/:id', upload.single('image'), productControllerV2.update);
router.delete('/product/:id', upload.single('image'), productControllerV2.destroy);

module.exports = router;