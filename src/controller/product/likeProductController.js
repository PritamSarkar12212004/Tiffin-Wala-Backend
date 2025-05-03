import mongoose from "mongoose";
import Product from "../../model/product/postModel.js";

const likeProductController = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Validate productId and userId
    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ message: "Invalid productId or userId" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const isLiked = product.productLikes.some(
      (id) => id.toString() === userObjectId.toString()
    );

    if (isLiked) {
      // If already liked, then unlike
      product.productLikes = product.productLikes.filter(
        (id) => id.toString() !== userObjectId.toString()
      );
    } else {
      // If not liked, then like
      product.productLikes.push(userObjectId);
    }

    await product.save();

    res.status(200).json({
      message: isLiked ? "unliked" : "liked",
      totalLikes: product.productLikes.length,
    });
  } catch (error) {
    console.error("Error liking product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default likeProductController;
