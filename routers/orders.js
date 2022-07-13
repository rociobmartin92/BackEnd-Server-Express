const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { Order } = require("../models/order");
const { OrderItem } = require("../models/orderItem");

// POST

route.post("/", async (req, res) => {
  const orderItemsIds = Promise.all(
    req.body.orderItems.map(async (item) => {
      let newItem = new OrderItem({
        product: item.product,
        quantity: item.quantity,
      });

      newItem = await newItem.save();

      return newItem._id;
    })
  );
  console.log(orderItemsIds);
  const orderItemsIdsResolved = await orderItemsIds;

  const newOrder = new Order({
    // orderItems is an array of ids, wi will create this below
    orderItems: orderItemsIdsResolved,
    shippingAdress: req.body.shippingAdress,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country,
    phone: req.body.phone,
    status: req.body.status,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
    dateOrder: req.body.dateOrder,
  });
  newOrderUser = await newOrder.save();

  newOrderUser
    ? res.status(200).json(newOrderUser)
    : res.status(400).json({ message: "The order could not be created" });
});

// GET

route.get("/", async (req, res) => {
  const getOrders = await Order.find();
  getOrders
    ? res.status(200).json(getOrders)
    : res.status(500).json({
        message: "There are no orders",
      });
});

module.exports = route;
