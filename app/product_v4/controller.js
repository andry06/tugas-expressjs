const Product = require('./model');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
    const { search } = req.query;
    Product.find({name: new RegExp(search, 'i') })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const show = (req, res) => {
    const { id } = req.params;
    Product.findById(id)
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const store = (req, res) => {
    const { name, price, stock, status } = req.body;  
    const image = req.file;

    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({ name, price, stock, status, image_url: `http://localhost:3001/public/${image.originalname}` })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }else{
        Product.create({ name, price, stock, status })
        .then(result => res.send(result))
        .catch(error => res.send(error));
    }
}

const update = (req, res) => {
    const { name, price, stock, status } = req.body;  
    const image = req.file;
    const { id } = req.params;
    let exec = {};
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        exec = { name:name, price:price, stock: stock, status: status, image_url: `http://localhost:3001/public/${image.originalname}`};

    }else{
        exec = { name:name, price:price, stock: stock, status: status};
    }
        Product.findOneAndUpdate({ _id: id },
        { $set: exec })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const destroy = (req, res) => {
    const { id } = req.params;
    Product.findOneAndRemove({_id: id})
        
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

module.exports = {
    index,
    store,
    show,
    update,
    destroy
}
