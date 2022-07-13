const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const mongoose = require("mongoose");
const authJwt = require("./helpers/jsonwebtoken");
const errorHandler = require("./helpers/error-handler");

// --- --- --- --- --- --- --- Middleware --- --- --- --- --- --- --- ---
// Uso un modulo de express para que el servidor pueda leer codigo json
app.use(express.json());
// Uso morgan para saber que peticiones se estan haciendo del lado del usuario
app.use(morgan("tiny"));
app.use(authJwt());
// //This middleware will be executed everytime is a error in the procces before to get the final listening
app.use(errorHandler);

// --- --- --- --- --- --- Dotenv --- --- --- --- --- --- --- --- --- ---
// Luego de installar dontenv, me lo traigo al servidor
require("dotenv/config");
const api = process.env.API_URL;
const connectDB = process.env.CONNECTION_DB;

// --- --- --- --- --- --- Connection to Mongo Data Base Atlas --- --- ---
mongoose
  .connect(connectDB)
  .then(() => console.log("database connection is success"))
  .catch((e) => console.log("error connection database :", e));

// IMPORTING ROUTE HERE
app.use(`${api}/products`, require("./routers/products"));
app.use(`${api}/categories`, require("./routers/categories"));
app.use(`${api}/orders`, require("./routers/orders"));
app.use(`${api}/orderItems`, require("./routers/orderItems"));
app.use(`${api}/users`, require("./routers/users"));

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
