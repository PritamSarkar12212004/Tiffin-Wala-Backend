import admin from "firebase-admin";
const remindernotifyController = async (req, res) => {
  const { token, title, body } = req.body;
  const message = {
    notification: {
      title:
        "Tiffin garma-garam ready hai — abhi order karo aur time pe enjoy karo! 🍱",
      body: "Hello Pritam This is the best event notification",
    },
    data: {
      type: "remainder",
      navigate: "dashboard",
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
export default remindernotifyController;
