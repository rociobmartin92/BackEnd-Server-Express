const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const ProductSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  passwordHash: { type: String, require: true },
  city: { type: String, default: "" },
  zip: { type: String, default: "" },
  country: { type: String, default: "" },
  phone: { type: String, require: true },
  street: { type: String, default: "" },
  apartment: { type: String, default: "" },
  isAdmin: { type: Boolean, require: true },
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.User = mongoose.model("User", ProductSchema);
