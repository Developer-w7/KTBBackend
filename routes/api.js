var express = require("express");
var app = express();
var translationRouter = require("./query");

app.use("/query", translationRouter);

module.exports = app;