import mongoose from "mongoose";
import Product from "../../models/product/postModel.js";

const likeFetchController = async (req, res) => {
  try {
    const { productId, userId } = req.body;

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

    // Yahan sirf check karenge
    const isLiked = product.productLikes.some(
      (likeUserId) => likeUserId.toString() === userId
    );

    // Bas response bhejna hai, kuch bhi database mein nahi change karna hai
    return res.status(200).json({
      isLiked, // true ya false
      totalLikes: product.productLikes.length,
    });
  } catch (error) {
    console.error("Error checking like status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default likeFetchController;
