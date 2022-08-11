const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  breackfast: {
    type: String,
    require: true,
  },
  dessert: {
    type: String,
    require: true,
  },
  healthy: {
    type: String,
    require: true,
  },
  fast: {
    type: String,
    require: true,
  },
});

exports.Category = mongoose.model("Category", CategorySchema);
