const express = require("express");
const route = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// En el navegador, bcrypt.js se basa en la interfaz getRandomValues de Web Crypto API
// para obtener números aleatorios seguros.
const jsonwebtoken = require("jsonwebtoken");
require("dotenv/config");
// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { User } = require("../models/user");

// POST fot the admin

route.post("/", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    street: req.body.street,
    apartment: req.body.apartment,
    isAdmin: req.body.isAdmin,
  });

  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(500).json({
        message: "The user can not be created",
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getUser = await User.find().select("-passwordHash");
  getUser
    ? res.status(200).json(getUser)
    : res.status(500).json({
        message: "The user does not exist",
      });
});


// DELETE BY ID

route.delete("/:id", (req, res) => {
  !mongoose.isValidObjectId(req.params.id) &&
    res.status(400).json({
      message: "Invalid Id Product",
    });

  User.findByIdAndRemove(req.params.id)
    .select("-passwordHash")
    .then(() => res.status(200).json({ message: "User succefully deleted" }))
    .catch((err) =>
      res.status(500).json({
        message: "User could not be deleted",
      })
    );
});

// PUT

route.put("/:id", async (req, res) => {
  !mongoose.isValidObjectId(req.params.id) &&
    res.status(400).json({
      message: "Invalid Id Product",
    });

  const {
    name,
    email,
    passwordHash,
    city,
    zip,
    country,
    phone,
    street,
    apartment,
    isAdmin,
  } = req.body;
  const newUpdatedUser = await User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    passwordHash,
    city,
    zip,
    country,
    phone,
    street,
    apartment,
    isAdmin,
  });

  newUpdatedUser
    ? res.status(200).json(newUpdatedUser)
    : res.status(400).json({ message: "The user could not be updated" });
});

// FIND THE USER JUST BY PUTING THE EMAIL AND PASSWORD
// AUTHETICATE USER, I mean, if the user exists on database
// Also know if the password putted on is the correct one

route.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400).json({ message: "User not found!" });
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    // res.status(200).json({ message: "User Authenticated" });
    const secret = process.env.secret;
    const token = jsonwebtoken.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      secret,
      { expiresIn: "1d" }
    );

    res.status(200).json({ user: user.email, token: token });
  } else {
    res.status(400).json({ message: "The password is wrong" });
  }
});

// POST REGISTER (This is for the user, only post is for the admin)

route.post("/register", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    street: req.body.street,
    apartment: req.body.apartment,
    isAdmin: req.body.isAdmin,
  });

  newUser
    .save()
    .then((user) => res.status(200).json(user))
    .catch((err) =>
      res.status(500).json({
        message: "The user can not be created",
      })
    );
});


// COUNT HOW MANY USER HAVE OUR APP

route.get(`/get/count`, (req, res) => {
  User.countDocuments()
    .then((userCount) => res.json({ count: userCount }))
    .catch((err) =>
      res.status(400).json({
        error: err,
      })
    );
});

module.exports = route;
