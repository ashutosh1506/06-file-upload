const Product = require("../models/Product");

const createProduct = async (req, res) => {
  res.send("Create product");
};
const getAllProducts = async (req, res) => {
  res.send("list of product");
};
module.exports = {
  createProduct,
  getAllProducts,
};
