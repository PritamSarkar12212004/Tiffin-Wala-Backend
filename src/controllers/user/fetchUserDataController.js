import userModel from "../../models/userModel/userModel.js";
const fetchUserDataController = async (req, res) => {
  try {
    const { userId } = req.body;
    const fetchData = await userModel.findById(userId);
    if (fetchData) {
      res.status(200).json({
        message: "Data fetched successfully",
        data: fetchData,
      });
    } else {
      res.status(404).json({
        message: "Data not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
export default fetchUserDataController;
