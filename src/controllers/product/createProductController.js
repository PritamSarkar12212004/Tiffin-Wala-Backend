import postModel from "../../models/product/postModel.js";

const createProductController = async (req, res) => {
  try {
    const {
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

    // Create the post
    const createPost = await postModel.create({
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
        coordinates: [parseFloat(longitude), parseFloat(latitude)], // NOTE: longitude first, then latitude
      },
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: createPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error creating product",
      error: error.message,
    });
  }
};

export default createProductController;
