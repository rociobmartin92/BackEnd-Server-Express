const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const ProductSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  zip: String,
  country: String,
  phone: Number,
  street: String,
  apartment: String,
  isAdmin: Boolean,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.User = mongoose.model("User", ProductSchema);
