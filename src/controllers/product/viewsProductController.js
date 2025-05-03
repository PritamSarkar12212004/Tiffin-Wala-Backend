import postModel from "../../models/product/postModel.js";

const viewsProductController = async (req, res) => {
  const { postId } = req.body;
  await postModel.findByIdAndUpdate(postId, {
    $inc: { postTotalViews: 1 },
  });
  try {
    res.status(200).json({
      success: true,
      message: "Product views updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export default viewsProductController;
