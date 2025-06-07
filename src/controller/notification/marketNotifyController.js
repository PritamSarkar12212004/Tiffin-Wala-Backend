import admin from "firebase-admin";
const marketNotifyController = async (req, res) => {
  const { token, title, body } = req.body;
  const message = {
    notification: {
      title: "Aaj Ka Tiffin Taiyar Hai!",
      body: "Fresh aur garma-garam tiffin aapka intezaar kar raha hai. Jaldi order karein!",
    },
    data: {
      type: "open",
      navigate: "home",
    },

    android: { priority: "high" },
    apns: {
      payload: {
        aps: {
          alert: { title, body },
          sound: "default",
          contentAvailable: true,
        },
      },
    },
    token,
  };

  try {
    setTimeout(async () => {
      const response = await admin.messaging().send(message);
      console.log("Notification sent successfully:", response);
      res.status(200).json({ success: true, response });
    }, 1000);
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export default marketNotifyController;
