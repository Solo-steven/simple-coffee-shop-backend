const router = require('express').Router();
const productModel = require('../model/product');
const config = require('../.env.json');

router.get('/', async (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(401).json({ error: 'lack of paramemters' });
  const products = await productModel.find({ category });
  for (const product of products) {
    product.imgUrl = `http://${config.server.host}:${config.server.port}/${product.imgUrl}`;
  }
  return res.json(products);
});

module.exports = router;
