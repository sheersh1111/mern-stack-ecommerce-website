const express= require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router= express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrders);
router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);
router.put("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder)
.delete("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router;