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

// DELETE

route.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((response) => {
      response
        ? res.status(200).json({
            message: "Category succefully removed",
          })
        : res.status(400).json({
            message: "Category not found!",
          });
    })
    .catch((err) =>
      res.status(500).json({ message: "internal server error", err: err })
    );
});


// PUT

route.put("/:id", (req, res) => {
  Category.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    color: req.body.color,
    icon: req.body.icon,
  })
    .then((response) =>
      response
        ? res.status(200).json({ message: "Category succefully updated" })
        : res.status(400).json({
            message: "Category not found!",
          })
    )
    .catch((err) =>
      res.status(500).json({ message: "internal server error", err: err })
    );
});
module.exports = route;
