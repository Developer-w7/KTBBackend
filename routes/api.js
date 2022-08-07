var express = require("express");
var app = express();
var translationRouter = require("./query");
var seederRouter = require("./seeder");

app.use("/query", translationRouter);
app.use("/insert", seederRouter);


module.exports = app;