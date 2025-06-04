import Product from "../../model/product/postModel.js";

const allLikeProductController = async (req, res) => {
  try {
    const { userId } = req.body;
    const allLikeProduct = await Product.find({
      productLikes: { $in: [userId] },
    });
    if (allLikeProduct.length === 0) {
      return res.status(404).json({
        message: "No like product found",
      });
    } else {
      return res.status(200).json({
        data: allLikeProduct,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export default allLikeProductController;
