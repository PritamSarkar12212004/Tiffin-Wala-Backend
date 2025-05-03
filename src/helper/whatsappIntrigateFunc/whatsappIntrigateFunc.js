import pkg from "whatsapp-web.js";
const { Client } = pkg;

const whatsappIntrigateFunc = async (client, number, otp, status) => {
  try {
    if (!number || !otp) {
      console.log("Number and OTP are required");
      return;
    }
    const chatId = `91${number}@c.us`;
    try {
      const isRegistered = await client.isRegisteredUser(chatId);
      if (isRegistered) {
        await client.sendMessage(
          chatId,
          `🔐 Tiffin Wala ${status} OTP is: *${otp}*`
        );
        console.log("OTP sent via WhatsApp");
      } else {
        console.log("Number is not registered on WhatsApp");
      }
    } catch (error) {
      console.log("Error checking WhatsApp registration:", error);
    }
  } catch (error) {
    console.log("Error in WhatsApp integration:", error);
  }
};

export default whatsappIntrigateFunc;
