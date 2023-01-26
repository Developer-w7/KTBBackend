var express = require("express");
var app = express();
var translationRouter = require("./query");
var seederRouter = require("./seeder");
var authRouter = require("./auth");

app.use("/query", translationRouter);
app.use("/insert", seederRouter);
app.use("/auth", authRouter);

module.exports = app;