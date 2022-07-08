const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { Product } = require("../models/product");

// POST

route.post("/", (req, res) => {
  // Requiero al front end la data que ingreso el usuario en el body
  const {
    name,
    image,
    images,
    brand,
    price,
    countStock,
    category,
    rating,
    isFeatured,
    dateCreated,
  } = req.body;
  // Lo guardos en variables
  const newProduct = new Product({
    name,
    image,
    images,
    brand,
    price,
    countStock,
    category,
    rating,
    isFeatured,
    dateCreated,
  });

  newProduct
    .save()
    .then((product) => res.status(200).json(product))
    .catch((err) =>
      res.status(500).json({
        request: succes,
        error: err,
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getProduct = await Product.find();
  getProduct
    ? res.status(200).json(getProduct)
    : res.status(500).json({
        request: unsuccess,
      });
});

module.exports = route;
