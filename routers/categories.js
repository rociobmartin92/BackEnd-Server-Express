const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { Category } = require("../models/category");

// POST

route.post("/", (req, res) => {
  const { name, color, icon } = req.body;
  const newCategory = new Category({
    name,
    color,
    icon,
  });

  newCategory
    .save()
    .then((category) => res.status(200).json(category))
    .catch(() =>
      res.status(400).json({
        error: "Category can not be created",
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getCategory = await Category.find();
  getCategory
    ? res.status(200).json(getCategory)
    : res.status(400).json({
        error: "Category can not be getted",
      });
});

route.delete("/:id", async (req, res) => {
  const removeCategory = await Category.findByIdAndRemove(req.params.id);
  removeCategory
    ? res.status(200).json({
        message: "Category succefully removed",
      })
    : res.status(400).json({
        message: "Category not found!",
      });
});

module.exports = route;
