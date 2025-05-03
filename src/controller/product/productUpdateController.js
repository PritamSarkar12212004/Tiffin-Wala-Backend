import postModel from "../../model/product/postModel.js";

const productUpdateController = async (req, res) => {
  try {
    const {
      productId,
      title,
      description,
      price,
      foodTypes,
      images,
      address,
      latitude,
      longitude,
      availableDays,
      mealTypes,
      menuItems,
      userId,
    } = req.body;

    // Validate required fields
    if (
      !productId ||
      !title ||
      !description ||
      !price ||
      !foodTypes ||
      !images ||
      !address ||
      !latitude ||
      !longitude ||
      !availableDays ||
      !mealTypes ||
      !userId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Update the post
    const updatedPost = await postModel.findByIdAndUpdate(
      productId,
      {
        postTitle: title,
        postDescription: description,
        postPrice: price,
        postFoodType: foodTypes,
        postCoverImage: images,
        postMenu: menuItems
          ? menuItems
          : [
              {
                title: "",
                description: "",
                image: "",
              },
            ],
        postLocation: address,
        postlatitude: latitude,
        postlongitude: longitude,
        postValidDay: availableDays,
        postMealTypes: mealTypes,
        postVendorId: userId,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

export default productUpdateController;
