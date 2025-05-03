import postModel from "../../model/product/postModel.js";
const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.body;
    await postModel.findByIdAndDelete(productId).then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json({ message: "ProductDeleted" });
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default deleteProductController;
