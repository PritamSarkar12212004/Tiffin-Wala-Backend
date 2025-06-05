import userModel from "../../model/userModel/userModel.js";
const notiFyIdgeterController = async (req, res) => {
  const { token, userId } = req.body;
  try {
    const data = await userModel.findById(userId);
    if (data) {
      if (data.token !== token) {
        await userModel.findByIdAndUpdate(userId, {
          token: token,
        });
      } else {
        return res.status(200).json({
          message: "token already exist",
        });
      }
    } else {
      await userModel.findByIdAndUpdate(userId, {
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export default notiFyIdgeterController;
