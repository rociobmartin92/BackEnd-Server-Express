
const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const ProductSchema = mongoose.Schema({
  name: String,
  image: String,
  countStock: Number,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.Product = mongoose.model("Product", ProductSchema);
