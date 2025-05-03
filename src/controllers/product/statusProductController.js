import postModel from "../../models/product/postModel.js";
const statusProductController = async (req, res) => {
  try {
    const { productId, postStatus } = req.body;
    console.log(postStatus);
    await postModel
      .findByIdAndUpdate(productId, {
        postStatus: postStatus === "Active" ? "Inactive" : "Active",
      })
      .then((result) => {
        res.status(200).json({
          status: "success",
          message: "Product status updated successfully",
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: "error",
          message: "Failed to update product status",
          error: err.message,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
export default statusProductController;
