const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.Category = mongoose.model("Category", CategorySchema);
