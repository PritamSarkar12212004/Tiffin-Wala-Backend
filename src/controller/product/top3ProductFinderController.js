import postModel from "../../model/product/postModel.js";

const top3ProductFinderController = async (req, res) => {
  try {
    const { latitude, longitude } = req.body.locationData || {};
    const { priceRange } = req.body.filters || { priceRange: [0, 3500] }; // Default price range if not provided
    const { distance } = req.body;

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

    const radiusInKm = distance || 10;
    const radiusInRadians = radiusInKm / 6378.1; // Earth radius in km

    const nearbyProducts = await postModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude), parseFloat(latitude)],
            radiusInRadians,
          ],
        },
      },
      postPrice: { $lte: priceRange[1] }, // Filter products under priceRange[1]
      postStatus: "Active",
    });

    if (nearbyProducts.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No active products found nearby under priceRange[1]",
        products: [],
      });
    }

    // Add distance to each product
    const productsWithDistance = nearbyProducts.map((product) => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(product.postlatitude),
        parseFloat(product.postlongitude)
      );
      return {
        ...product.toObject(),
        distance: parseFloat(distance.toFixed(2)), // Round to 2 decimal places
      };
    });

    // Sort only by likes
    const likesSorted = [...productsWithDistance].sort((a, b) => {
      const aLikes = a.productLikes.length;
      const bLikes = b.productLikes.length;
      return bLikes - aLikes; // Sort by likes in descending order
    });

    // Get only top 3 products
    const top3Products = likesSorted.slice(0, 6);

    return res.status(200).json({
      success: true,
      message: "Top 3 products under priceRange[1] sorted by likes",
      products: top3Products,
    });
  } catch (error) {
    console.error("Error in top3ProductFinderController:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

export default top3ProductFinderController;
