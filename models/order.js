const express = require("express");
const mongoose = require("mongoose");

// --- --- --- --- --- --- SCHEMAS (Mongoose) --- --- --- --- --- --- --- ---

const OrderSchema = mongoose.Schema({
  orderItems: [],
  shippingAdress: String,
  city: String,
  zip: String,
  country: String,
  phone: Number,
  status: String,
  totalPrice: Number,
  user: String,
  dateOrder: Date,
});

// --- --- --- --- --- --- MODELS (Mongo) --- --- --- --- --- --- --- --- ---

exports.Order = mongoose.model("Order", OrderSchema);
