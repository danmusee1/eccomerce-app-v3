const express=require("express");
const { getAllProducts,createProduct, updateProduct, deleteProducts, getProductDetails } = require("../controllers/productControllers");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new")
.post(isAuthenticatedUser ,authorizeRoles("admin") ,createProduct);

router
.route("/products/:id")
.put(isAuthenticatedUser ,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser ,authorizeRoles("admin"),deleteProducts)

router.route("/product/:id").get(getProductDetails);

module.exports= router