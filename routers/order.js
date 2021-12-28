const router = require('express').Router();
const orderModel  = require('../model/order');


router.post("/", async function (req, res) {
    const { payWay, deliverWay, list, buyer, reciver  } = req.body.data;
    console.log(req.body.data);
    if(!payWay || !deliverWay || !list || !buyer || !reciver) 
        return res.status(400).json({});
    if(list.length  == 0 )
        return res.status(400).json({});
    const order = new orderModel({
        payWay, deliverWay, list, buyer, reciver
    });
    order.save();
    return res.status(200).json({ id: order._id });
});

router.get("/", async function (req, res) {
    const { id } = req.query;
    if(!id) return res.status(400).json();
    try{
        const data = await orderModel.findById(id);
        return res.status(200).json(data);
    }catch(err) {
        return res.status(404).json();
    }
})

module.exports = router ;