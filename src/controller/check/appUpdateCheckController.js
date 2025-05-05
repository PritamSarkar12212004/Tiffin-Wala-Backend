const appUpdateCheckController = async (req, res) => {
  try {
    const { appId, appName, appVersion } = req.body;
    console.log(appId, appName, appVersion);
    if (appVersion === "1.0.0") {
      res.status(200).json({
        message: "App is up to date",
        version: "1.0.0",
        update: true,
      });
    } else {
      res.status(400).json({
        message: "App is not up to date",
        version: "1.0.0",
        update: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
export default appUpdateCheckController;
