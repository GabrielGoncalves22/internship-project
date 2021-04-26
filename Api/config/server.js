const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const dotenv = require('dotenv');
dotenv.config();

const consign = require('consign');
consign().include('./config/connectionDB.js')
    .then('./middleware/login.js')
    .then('./controllers')
    .then('./routes')
    .into(app);

module.exports = app;