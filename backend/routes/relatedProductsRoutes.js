import express from "express";
import { getRelatedProducts } from  '../Controllers/relatedProductsController.js'

const router = express.Router();

router.get("/related/:productId", getRelatedProducts);

export default router;
