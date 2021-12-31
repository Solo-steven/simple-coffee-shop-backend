const router = require('express').Router();
const orderModel = require('../model/order');
const productModel = require('../model/product');
const config = require('../.env.json');

/**
 *  @swagger
 *  paths:
 *    /order:
 *      get:
 *        tags: [order]
 *        description: Get order by id
 *        parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: string
 *        responses:
 *            200:
 *              description: request id is exist.
 *              content:
 *                appplication/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      id:
 *                        description: order id.
 *                        type: string
 *                      payWay:
 *                        description: how this order would be pay.
 *                        type: string
 *                      deliverWay:
 *                        description: how this order would be deliver.
 *                        type: string
 *                      list:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                              name:
 *                                type: string
 *                              number:
 *                                type: number
 *                              specification:
 *                                type: string
 *                              price:
 *                                type: number
 *                              imgUrl:
 *                                type: string
 *
 *                      buyer:
 *                         description: infomation of buyer.
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           email:
 *                             type: string
 *                      reciver:
 *                         description: infomation of buyer.
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           phone:
 *                             type: string
 *                           email:
 *                             type: string
 */

router.get('/', async (req, res) => {
  const { id } = req.query;
  if (!id) return res.status(400).json();
  try {
    const data = await orderModel.findById(id);
    const order = {
      payWay: data.payWay,
      deliverWay: data.deliverWay,
      buyer: data.buyer,
      reciver: data.reciver,
      id: data._id,
      list: [],
    };
    // eslint-disable-next-line no-restricted-syntax
    for (const item of data.list) {
      // eslint-disable-next-line no-await-in-loop
      const products = await productModel.find({ name: item.name });
      const product = products[0];

      order.list.push({
        specification: item.specification,
        number: item.number,
        name: item.name,
        imgUrl: `http://${config.server.host}:${config.server.port}/${product.imgUrl}`,
        price: product.price[product.specification.indexOf(item.specification)],
      });
    }
    return res.status(200).json(order);
  } catch (err) {
    return res.status(404).json();
  }
});

/**
 * @swagger
 * paths:
 *  /order:
 *    post:
 *      tags: [order]
 *      description: create a new order
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                payWay:
 *                  description: how this order would be pay.
 *                  type: string
 *                deliverWay:
 *                  description: how this order would be deliver.
 *                  type: string
 *                list:
 *                  description: cart of this order
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                       name:
 *                         type: string
 *                       specification:
 *                         type: string
 *                       number:
 *                         type: number
 *                buyer:
 *                  description: infomation of buyer.
 *                  type: object
 *                  properties:
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 *                reciver:
 *                  description: infomation of buyer.
 *                  type: object
 *                  properties:
 *                     name:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     email:
 *                       type: string
 */
router.post('/', async (req, res) => {
  const {
    payWay, deliverWay, list, buyer, reciver,
  } = req.body.data;
  if (!payWay || !deliverWay || !list || !buyer || !reciver) { return res.status(400).json({}); }
  if (list.length === 0) { return res.status(400).json({}); }
  const order = new orderModel({
    payWay, deliverWay, list, buyer, reciver,
  });
  order.save();
  return res.status(200).json({ id: order._id });
});

module.exports = router;
