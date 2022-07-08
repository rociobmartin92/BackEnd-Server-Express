const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { User } = require("../models/user");

// POST

route.post("/", (req, res) => {
  // Requiero al front end la data que ingreso el usuario en el body
  const {
    name,
    email,
    password,
    city,
    zip,
    country,
    phone,
    street,
    apartment,
    isAdmin,
  } = req.body;
  // Lo guardos en variables
  const newUser = new User({
    name,
    email,
    password,
    city,
    zip,
    country,
    phone,
    street,
    apartment,
    isAdmin,
  });

  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(500).json({
        request: succes,
        error: err,
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getProduct = await User.find();
  getUser
    ? res.status(200).json(getUser)
    : res.status(500).json({
        request: unsuccess,
      });
});

module.exports = route;
