require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");

const apiRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(cors(require("./config/cors")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", apiRouter);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err, _req, res, _next) => {
  const errObj = {
    status: err.status,
    message: err.message,
    stack: err.stack,
  };
  console.log(errObj);

  res.status(err.status || 500);
  res.json(errObj);
});

module.exports = app;
