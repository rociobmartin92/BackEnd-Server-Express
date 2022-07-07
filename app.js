const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const morgan = require("morgan");
const mongoose = require("mongoose");

// --- --- --- --- --- --- --- Middleware --- --- --- --- --- --- --- ---
// Uso un modulo de express para que el servidor pueda leer codigo json
app.use(express.json());
// Uso morgan para saber que peticiones se estan haciendo del lado del usuario
app.use(morgan("tiny"));

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

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const ProductSchema = mongoose.Schema({
  name: String,
  image: String,
  countStock: Number,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

const Product = mongoose.model("Product", ProductSchema);

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

// GET
// GET ID
// POST

app.post(
  ("/",
  (req, res) => {
    const { name, image, countStock } = req.body;
    const newProduct = new Product({ name, image, countStock });
    newProduct
      .save()
      .then((product) => res.send(console.log(product)))
      .catch((err) => console.log(err));
  })
);
app.get(`${api}/products`, (req, res) => res.send("getting is working"));

app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
