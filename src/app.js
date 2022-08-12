const express = require("express");
const cors = require("cors");
const swagger = require("./Docs");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
swagger(app)
module.exports = app;
