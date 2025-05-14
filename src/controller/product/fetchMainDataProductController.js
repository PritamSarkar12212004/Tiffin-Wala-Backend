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

    // Function to calculate distance between two points using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in kilometers
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };

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

    // Add distance to each product and sort
    const productsWithDistance = nearbyProducts.map(product => {
      const productLocation = product.location.coordinates;
      const distance = calculateDistance(
        latitude,
        longitude,
        productLocation[1], // MongoDB stores coordinates as [longitude, latitude]
        productLocation[0]
      );
      const roundedDistance = parseFloat(distance.toFixed(2));
      return {
        ...product.toObject(),
        distance: roundedDistance, // Keep original distance for calculations
        distanceText: `${roundedDistance} km` // Add formatted distance text
      };
    });

    // Sort products by likes, views, and distance
    const sortedProducts = productsWithDistance.sort((a, b) => {
      // First sort by number of likes
      const aLikes = a.productLikes.length;
      const bLikes = b.productLikes.length;
      if (bLikes !== aLikes) {
        return bLikes - aLikes;
      }
      // If likes are equal, sort by views
      const viewDiff = (b.postTotalViews || 0) - (a.postTotalViews || 0);
      if (viewDiff !== 0) {
        return viewDiff;
      }
      // If views are equal, sort by distance
      return a.distance - b.distance;
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
