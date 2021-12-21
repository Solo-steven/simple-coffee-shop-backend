const express = require('express');
const app = express();
const monogoose = require('mongoose');
const config = require('./.env.json');
const productRouter = require("./routers/products");

app.use("/products", productRouter);

app.listen(config.server.port, async () => {
    await monogoose.connect(config.db.url);
    console.log("Server Start");
});