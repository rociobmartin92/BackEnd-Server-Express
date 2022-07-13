const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---
const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { default: mongoose } = require("mongoose");

// POST

route.post("/", async (req, res) => {
  // El usuario deberá colocar manualmente la categoria
  const category = await Category.findById(req.body.category);
  !category &&
    res.json({
      message: "category Id is invalid",
    });

  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    images: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    countStock: req.body.countStock,
    category: req.body.category,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
  });

  const product = await newProduct.save();
  product
    ? res.status(200).json(newProduct)
    : res.status(400).json({
        message: "New product has been created",
      });
});

// req.query es un objeto de solicitud que se completa con cadenas de consulta de solicitud que se encuentran en una URL.
//  Estas cadenas de consulta están en formato key-value. Comienzan después del signo de interrogación en cualquier URL.
// Y si hay más de uno, se separan con el ampersand. Vea el ejemplo a continuación.
// https://educative.io/user?name=Theodore&isAuthor=true

// GET

route.get("/", async (req, res) => {
  let filter = {};

  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const getAll = await Product.find(filter).populate("category");
  getAll
    ? res.status(200).json(getAll)
    : res.status(400).json({
        message: "the procees has failed to get all products",
      });
});

// GET BY ID

route.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");
  product
    ? res.status(200).json(product)
    : res.status(400).json({
        message: "the procees has failed to get the products",
      });
});

// COUNT THE DOCUMENTS IN PRODUCT COLLECTION

route.get(`/get/count`, (req, res) => {
  Product.countDocuments()
    .then((productCount) => res.json({ count: productCount }))
    .catch((err) =>
      res.status(400).json({
        error: err,
      })
    );
});

// GET ALL FEATURED

route.get(`/get/featured`, async (req, res) => {
  const productsFeatured = await Product.find({ isFeatured: true });

  productsFeatured
    ? res.json(productsFeatured)
    : res.json({ message: "There are not any product featured" });
});

// GET FEATURED BY PASSING A NUMBER count

route.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const productFeatured = await Product.find({ isFeatured: true }).limit(
    +count
  );

  productFeatured
    ? res.json(productFeatured)
    : res.json({ message: "There are not any product featured" });
});

// DELETE

route.delete("/:id", (req, res) => {
  !mongoose.isValidObjectId(req.params.id) &&
    res.status(400).json({
      message: "Invalid Id Product",
    });

  Product.findByIdAndRemove(req.params.id)
    .then(() =>
      res.status(200).json({
        message: "Product has been deleted succesfully",
      })
    )
    .catch(() =>
      res.json({
        message: "Product has not been deleted ",
      })
    );
});

// PUT

route.put("/:id", async (req, res) => {
  !mongoose.isValidObjectId(req.params.id) &&
    res.status(400).json({
      message: "Invalid Id Product",
    });

  const category = await Product.findById(req.body.category);
  !category &&
    res.json({
      message: "Product Id is invalid",
    });

  Product.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    images: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    countStock: req.body.countStock,
    category: req.body.category,
    rating: req.body.rating,
    isFeatured: req.body.isFeatured,
    dateCreated: req.body.dateCreated,
  })
    .then((response) =>
      response
        ? res.status(200).json({ message: "Product succefully updated" })
        : res.status(400).json({
            message: "Product not found!",
          })
    )
    .catch((err) =>
      res.status(500).json({ message: "internal server error", err: err })
    );
});

module.exports = route;
