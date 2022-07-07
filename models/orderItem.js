
const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const SingleOrderSchema = mongoose.Schema({
  name: String,
  image: String,
  countStock: Number,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.OrderItem = mongoose.model("OrderItem", SingleOrderSchema);
