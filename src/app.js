const express = require("express");
const cors = require("cors");
const swagger = require("./Docs");
const propertyRouter = require("./routers/property.router");
const categoryRouter = require("./routers/category");

const app = express();
require("./config/db.config");
require("dotenv").config();

app.use(cors());
app.use(express.json());

swagger(app);

app.use("/api/properties", propertyRouter);
app.use("/api/categories", categoryRouter);


module.exports = app;
