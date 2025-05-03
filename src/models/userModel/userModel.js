import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    User_Name: {
      type: String,
    },
    User_Image: {
      type: String,
    },
    User_Email: {
      type: String,
    },
    User_Phone_Number: {
      type: String,
    },
    User_Gender: {
      type: String,
    },
    User_Bio: {
      type: String,
    },
    User_Address: {
      type: {},
    },
    User_Created_At: {
      type: Date,
      default: Date.now,
    },
    userPostList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
