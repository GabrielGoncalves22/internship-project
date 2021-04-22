var express = require('express');
var app = express();

var consign = require('consign');

consign().include('./config/connectionDB.js')
    .then('./controllers')
    .then('./routes')
    .into(app)

module.exports = app;