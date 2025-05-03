import postModel from "../../model/product/postModel.js";

const profuctFilterController = async (req, res) => {
  try {
    const { priceRange, sortBy } = req.body.filters;
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
    const productsWithDistance = nearbyProducts.map(product => {
      const distance = calculateDistance(
        parseFloat(latitude),
        parseFloat(longitude),
        parseFloat(product.postlatitude),
        parseFloat(product.postlongitude)
      );
      return {
        ...product.toObject(),
        distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
      };
    });

    if (sortBy === "distance") {
      const distanceSorted = [...productsWithDistance].sort((a, b) => a.distance - b.distance);
      
      return res.status(200).json({
        success: true,
        message: "Products under priceRange[1] sorted by distance",
        products: distanceSorted,
      });
    } else if (sortBy === "price") {
      const priceSorted = [...productsWithDistance].sort(
        (a, b) => (a.postPrice || 0) - (b.postPrice || 0)
      );
      return res.status(200).json({
        success: true,
        message: "Products under priceRange[1] sorted by price",
        products: priceSorted,
      });
    } else {
      const likesSorted = [...productsWithDistance].sort((a, b) => {
        const aLikes = a.productLikes.length;
        const bLikes = b.productLikes.length;
        if (bLikes !== aLikes) {
          return bLikes - aLikes;
        }
        return (b.postTotalViews || 0) - (a.postTotalViews || 0);
      });
      return res.status(200).json({
        success: true,
        message: "Products under priceRange[1] sorted by likes",
        products: likesSorted,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error,
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

export default profuctFilterController;
