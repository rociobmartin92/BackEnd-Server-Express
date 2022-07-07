
const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const CategorySchema = mongoose.Schema({
  name: String,
  color: String,
  icon: String,
  image: String,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.Category = mongoose.model("Category", CategorySchema);
