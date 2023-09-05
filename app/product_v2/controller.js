const Product = require('./model');
const path = require('path');
const fs = require('fs');
const { Op } = require('sequelize');


const index = async (req, res) => {
     const { search } = req.query;
     let filterSearch = {};
     if(search){
        filterSearch= {
            where: {
                name: {
                  [Op.like]: `%${search}%`
                }
            }
          }
    }
        
    try{
       
        const result = await Product.findAll(filterSearch);
        res.send({
            status: 'success',
            response: result
        });
    }catch(error){
        res.send({
            status: 'failed',
            response: error
        });
    }
}

const show = async (req, res) => {
    try{
        const result = await Product.findAll({
            where: {
              id: req.params.id
            }
          });
        res.send(result);
    }catch(error){
        res.send({
            status: 'failed',
            response: error
        });
    }
}

const store = async (req, res) => {
    const { user_id, name, price, stock, status } = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        try{
            await Product.sync();
            const result = await Product.create({ user_id, name, price, stock, status, image_url: `http://localhost:3001/public/${image.originalname}` });
            res.send({
                status: 'success',
                response: result
            });
        }catch(error){
            res.send({
                status: 'failed',
                response: error
            });
        }
    }
}

const update = async (req, res) => {
    const { user_id, name, price, stock, status } = req.body;
    const image = req.file;
    let exec = {};
    if(image){
        exec = { user_id: user_id, name:name, price:price, stock: stock, status: status, image_url: `http://localhost:3001/public/${image.originalname}`};
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
    }else{
        exec = { user_id: user_id, name:name, price:price, stock: stock, status: status};
    }
    try{
        await Product.sync();
        const result = await Product.update(exec, {
            where: {
              id: req.params.id
            }
        });
        res.send({
            status: 'success',
            response: result
        });
    }catch(error){
        res.send({
            status: 'failed',
            response: error
        });
    }
}

const destroy = async (req, res) => {
    try{
        const result = await Product.destroy({
            where: {
              id: req.params.id
            }
          });
        res.send({
            status: 'Sucess',
            response: result
        });
    }catch(error){
        res.send({
            status: 'failed',
            response: error
        });
    }
}


module.exports = {
    index,
    show,
    store,
    update,
    destroy
};