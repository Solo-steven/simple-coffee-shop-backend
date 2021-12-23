const router = require('express').Router();
const productModel = require('../model/product');
const config = require('../.env.json');

router.get('/', async (req, res) => {
    const products = await productModel.find();
    for(const product of products) {
        product.imgUrl =  `http://${config.server.host}:${config.server.port}/${product.imgUrl}`
    }
    return res.json(products)
});

module.exports = router;
