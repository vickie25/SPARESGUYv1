import express from "express";
import { getRelatedProducts } from  '../Controllers/relatedProductsController'

const router = express.Router();

router.get("/products/:productId/related", getRelatedProducts);

export default router;
