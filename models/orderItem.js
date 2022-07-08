const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const SingleOrderSchema = mongoose.Schema({
  product: String,
  quantity: Number,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.OrderItem = mongoose.model("OrderItem", SingleOrderSchema);
