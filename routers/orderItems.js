const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { OrderItem } = require("../models/orderItem");

// POST

route.post("/", (req, res) => {
  // Requiero al front end la data que ingreso el usuario en el body
  const { product, quantity } = req.body;
  // Lo guardos en variables
  const newItem = new OrderItem({
    product,
    quantity,
  });

  newItem
    .save()
    .then((item) => res.status(200).json(item))
    .catch((err) =>
      res.status(500).json({
        request: succes,
        error: err,
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getItem = await OrderItem.find();
  getItem
    ? res.status(200).json(getItem)
    : res.status(500).json({
        request: unsuccess,
      });
});

module.exports = route;
