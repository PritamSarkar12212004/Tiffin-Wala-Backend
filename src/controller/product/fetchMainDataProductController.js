import postModel from "../../model/product/postModel.js";

const fetchMainDataProductController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body.locationData || {};
    // Validate inputs
    if (
      latitude === undefined ||
      longitude === undefined ||
      latitude === null ||
      longitude === null
    ) {
      return res.status(400).json({
        success: false,
        message: "Latitude and longitude are required",
      });
    }

    const radiusInKm = 5;
    const radiusInRadians = radiusInKm / 6378.1; // Earth radius in km

    // Find nearby products with postStatus Active
    const nearbyProducts = await postModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude), parseFloat(latitude)],
            radiusInRadians,
          ],
        },
      },
      postStatus: "Active",
    });

    if (nearbyProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No active products found nearby",
        products: [],
      });
    }

    // Sort products by likes and views
    const sortedProducts = nearbyProducts.sort((a, b) => {
      // First sort by number of likes
      const aLikes = a.productLikes.length;
      const bLikes = b.productLikes.length;
      if (bLikes !== aLikes) {
        return bLikes - aLikes;
      }
      // If likes are equal, sort by views
      return (b.postTotalViews || 0) - (a.postTotalViews || 0);
    });

    return res.status(200).json({
      success: true,
      message: "Nearby active products fetched successfully",
      products: sortedProducts,
    });
  } catch (error) {
    console.error("Error fetching nearby products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default fetchMainDataProductController;
