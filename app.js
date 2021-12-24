const express = require('express');
const app = express();
const monogoose = require('mongoose');
const config = require('./.env.json');
const productRouter = require("./routers/products");
const path = require('path');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    origin: config.test
}));

app.use(express.static(path.join(__dirname, "images")))
app.use("/products", productRouter);

app.listen(config.server.port, async () => {
    await monogoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    console.log("Server Start at", config.server.port);
});