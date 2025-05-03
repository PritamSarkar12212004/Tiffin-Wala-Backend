import postModel from "../../models/product/postModel.js";
const fetchProductController = async (req, res) => {
  try {
    const { id } = req.body;
    const fetchProduct = await postModel.find({
      postVendorId: id,
    });

    if (!fetchProduct) {
      return res.status(404).json({
        success: true,
        message: "product not found",
      });
    }

    const productsWithLikes = await Promise.all(
      fetchProduct.map(async (product) => {
        const totalLikes = product.productLikes.length;
        return {
          ...product._doc,
          totalLikes,
          productLikes: product.productLikes,
        };
      })
    );

    // Calculate total likes across all products
    const totalLikesCount = productsWithLikes.reduce((sum, product) => sum + product.totalLikes, 0);
    
    // Calculate total views across all products
    const totalViewsCount = fetchProduct.reduce((sum, product) => sum + (product.postTotalViews || 0), 0);

    return res.status(201).json({
      success: true,
      message: "Product fetch successfully",
      data: fetchProduct,
      totalLikesCount: totalLikesCount,
      totalViewsCount: totalViewsCount
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "error",
      data: error.message,
    });
  }
};
export default fetchProductController;
