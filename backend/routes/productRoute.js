const express=require("express");
const { getAdminProducts,getAllProducts,createProduct, updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview } = require("../controllers/productController");
const { createProductReviview } = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router=express.Router();

router.route("/products").get( getAllProducts);
router.route("/admin/products").get( isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts);


router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
.get(getProductDetails);

router.put("/review",isAuthenticatedUser,createProductReviview);
router.get("/reviews",getProductReviews)
      .delete("/reviews",isAuthenticatedUser,deleteReview);


module.exports = router