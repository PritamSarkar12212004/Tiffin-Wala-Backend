import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: [true, "Post title is required"],
  },
  postDescription: {
    type: String,
    required: [true, "Post description is required"],
  },
  postPrice: {
    type: Number,
    required: [true, "Post price is required"],
    min: [0, "Price cannot be negative"],
  },
  postFoodType: {
    type: [String],
    enum: ["Veg", "Non-Veg", "Vegan"],
    required: [true, "Food type is required"],
  },
  postCoverImage: {
    type: [String],
    required: [true, "At least one cover image is required"],
  },
  postMenu: [
    {
      title: {
        type: String,
        required: [true, "Menu item title is required"],
      },
      description: {
        type: String,
        required: [true, "Menu item description is required"],
      },
      image: {
        type: String,
        required: [true, "Menu item image is required"],
      },
    },
  ],
  postLocation: {
    type: String,
    required: [true, "Post location is required"],
  },
  postlatitude: {
    type: String,
    required: [true, "Post latitude is required"],
  },
  postlongitude: {
    type: String,
    required: [true, "Post longitude is required"],
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      default: undefined,
    },
  },

  postValidDay: {
    type: [String],
    required: [true, "Valid days are required"],
  },
  postMealTypes: {
    type: [String],
    required: [true, "Meal types are required"],
  },
  postVendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Vendor ID is required"],
  },
  productLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  postStatus: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
  postTotalViews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Add Geospatial Index
postSchema.index({ location: "2dsphere" });

const Post = mongoose.model("Post", postSchema);

export default Post;
