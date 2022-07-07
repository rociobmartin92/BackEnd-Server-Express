const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const ProductSchema = mongoose.Schema({
  name: String,
  image: String,
  images: [],
  brand: String,
  price: Number,
  countStock: Number,
  category: String,
  rating: Number,
  isFeatured: Boolean,
  dateCreated: Date,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.Product = mongoose.model("Product", ProductSchema);
