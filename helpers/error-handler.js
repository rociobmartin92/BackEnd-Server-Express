const errorHandler = (err, req, res, next) => {
  err && res.status(500).json({ message: err });
};

module.exports = errorHandler;
