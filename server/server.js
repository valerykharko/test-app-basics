require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const router = require("./src/routes");
const errorHandler = require("./src/middlewares/error-middleware");

const server = express();

server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
server.use(express.urlencoded({ extended: false }));
server.use(
  express.static(path.resolve(__dirname, "src/database/static/images"))
);
server.use(fileUpload({}));
server.use("/api", router);

server.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    server.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
