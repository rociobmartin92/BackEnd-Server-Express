const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  countStock: {
    type: Number,
    require: true,
    min: 0,
    max: 50,
  },
  category: {
    // type es ID of the category
    type: mongoose.Schema.Types.ObjectId,
    // le digo que busque en CategorySchema el id
    ref: "Category",
    require: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.Product = mongoose.model("Product", ProductSchema);
