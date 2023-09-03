const log = (req, res, next) => {               //ini utk menangani log 
    console.log(new Date().toLocaleDateString(), '=>', req.method, req.originalUrl);
    next()
}

module.exports = log;