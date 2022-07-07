const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongo2 = require("./dbSchema");
const golddata = require("./routes/Golddata");

const main = async () => {
  try {
    // Connecting to mongoDb Atlas
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    await mongo2.connect();
    const app = express();
    var PORT = normalizePort(process.env.PORT);

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "jade");
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.json());
    app.use(morgan("common"));
    app.use(cors());

    app.use("/all", golddata);

    app.listen(PORT, () => {
      console.log(`API is ready on http://localhost:${PORT}`);
    });

    await console.log(`conected to host : ${conn.connection.host}`);
  } catch (error) {
    console.log("error starting our application", error);
  }
};

main();
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
