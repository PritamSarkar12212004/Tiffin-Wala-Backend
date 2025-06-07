import admin from "firebase-admin";
const eventNotifyController = async (req, res) => {
  const { token, title, body } = req.body;
  const message = {
    notification: {
      title: "This is event notification",
      body: "Hello Pritam This is the best event notification",
      image:
        "https://i.pinimg.com/736x/77/b4/d6/77b4d64bbbfda631885ba19008f30bba.jpg",
    },
    data: {
      type: "event",
      navigate: "dashboard",
      image:
        "https://i.pinimg.com/736x/77/b4/d6/77b4d64bbbfda631885ba19008f30bba.jpg",
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
export default eventNotifyController;
