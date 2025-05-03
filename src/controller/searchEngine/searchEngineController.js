import postModel from "../../model/product/postModel.js";

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const searchEngineController = async (req, res) => {
  try {
    const { query } = req.body;
    const { latitude, longitude } = req.body.location || {};

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

    const radiusInKm = 10;
    const radiusInRadians = radiusInKm / 6378.1; // Earth radius in km

    // Create aggregation pipeline
    const pipeline = [
      // Match stage for geospatial query and status
      {
        $match: {
          location: {
            $geoWithin: {
              $centerSphere: [
                [parseFloat(longitude), parseFloat(latitude)],
                radiusInRadians,
              ],
            },
          },
          postStatus: "Active", // Only fetch active products
        },
      },
      // Add text search if query is provided
      ...(query && query.trim() !== ""
        ? [
            {
              $match: {
                $or: [
                  { postTitle: { $regex: query, $options: "i" } },
                  { postLocation: { $regex: query, $options: "i" } },
                ],
              },
            },
          ]
        : []),
    ];

    const products = await postModel.aggregate(pipeline);

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No active products found matching your search criteria",
        products: [],
      });
    }

    // Calculate distance and format response
    const formattedProducts = products
      .map((product) => ({
        ...product,
        distance: parseFloat(
          calculateDistance(
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(product.postlatitude),
            parseFloat(product.postlongitude)
          ).toFixed(2)
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    return res.status(200).json({
      success: true,
      message: "Active products found successfully",
      products: formattedProducts,
    });
  } catch (error) {
    console.error("Error in searchEngineController:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching products",
      error: error.message,
    });
  }
};

export default searchEngineController;
