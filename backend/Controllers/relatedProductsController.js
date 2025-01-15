import Product from "../Models/productModel.js";

export const getRelatedProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    

    // Fetch the main product
    const product = await Product.findById(productId).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Fetch related products by category or tags, excluding the current product
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { tags: { $in: [product.tags] } },
      ],
      _id: { $ne: productId }, // Exclude the current product
    })
      .limit(4) // Limit the results to 4 products
      .select("name price imageUrl");

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
