import express from "express";
import * as productController from "../controllers/productController.js";
import { authMiddleware } from "../../http/middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, productController.getProducts);

router.get("/create", authMiddleware, productController.showCreateForm);
router.post("/", authMiddleware, productController.createProduct);

router.get("/:id", authMiddleware, productController.getProductById);
router.get("/:id/edit", authMiddleware, productController.showEditForm);
router.post("/:id/update", authMiddleware, productController.updateProduct);

router.post("/:id/delete", authMiddleware, productController.deleteProduct);

export default router;
