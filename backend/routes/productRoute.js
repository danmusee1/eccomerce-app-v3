const express=require("express");
const { getAllProducts,createProduct, updateProduct, deleteProducts, getProductDetails } = require("../controllers/productControllers");

const router=express.Router();

router.route("/products").get(getAllProducts)

router.route("/products/new").post(createProduct)

router.route("/products/:id").put(updateProduct).delete(deleteProducts).get(getProductDetails)

module.exports= router