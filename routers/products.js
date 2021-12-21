const router = require('express').Router();
const productModel = require('../model/product');


router.get('/', async (req, res) => {
    const products = await productModel.find();
    return res.json(products)
});

module.exports = router;
