const db = require('../../config/mongodb');
const path = require('path');
const fs = require('fs');
const { ObjectId } = require('mongodb');

const index = (req, res) => {
    db.collection('products').find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const show = (req, res) => {
    const { id } = req.params;
    db.collection('products').findOne({_id: new ObjectId(id)})
    .then(result => res.send(result))
    .catch(error => res.send(error));
}

const store = (req, res) => {
    const { name, price, stock, status } = req.body;  
    const image = req.file;

    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        db.collection('products').insertOne({ name, price, stock, status, image_url: `http://localhost:3001/public/${image.originalname}` })
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
        db.collection('products').updateOne({ _id: new ObjectId(id) },
        { $set: exec })
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

const destroy = (req, res) => {
    const { id } = req.params;
    db.collection('products').deleteMany({_id: new ObjectId(id)})
        
        .then(result => res.send(result))
        .catch(error => res.send(error));
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
}