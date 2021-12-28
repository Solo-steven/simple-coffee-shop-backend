const express = require('express');
const app = express();
const monogoose = require('mongoose');
const config = require('./.env.json');

const path = require('path');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "images")));
app.use(cors({
    origin: config.test
}));

const productRouter = require("./routers/products");
const orderRouter  = require("./routers/order");
app.use("/products", productRouter);
app.use("/orders", orderRouter);

const swaggerDoc = require("swagger-jsdoc");
const openAPIDoc = swaggerDoc(config.openapi)
const swaggerServer = require("swagger-ui-express");
app.use("/doc", swaggerServer.serve, swaggerServer.setup(openAPIDoc));

app.listen(config.server.port, async () => {
    await monogoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    console.log("Server Start at", config.server.port);
});