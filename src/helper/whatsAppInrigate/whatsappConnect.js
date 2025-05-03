import qrcode from "qrcode-terminal";
import pkg from "whatsapp-web.js";
const { Client, LocalAuth } = pkg;

let client = null;

const whatsappConnect = () => {
  return new Promise((resolve, reject) => {
    try {
      client = new Client({
        authStrategy: new LocalAuth({
          clientId: "whatsapp-client",
          dataPath: "./.wwebjs_auth"
        }),
        puppeteer: {
          headless: true,
          args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-accelerated-2d-canvas",
            "--no-first-run",
            "--no-zygote",
            "--disable-gpu"
          ]
        }
      });

      client.on("qr", (qr) => {
        console.log("\n📱 Scan this QR code with your WhatsApp:");
        console.log("----------------------------------------");
        qrcode.generate(qr, { small: true });
        console.log("----------------------------------------\n");
      });

      client.on("ready", () => {
        console.log("✅ WhatsApp is ready! Your number is linked.");
        resolve(client);
      });

      client.on("authenticated", () => {
        console.log("✅ WhatsApp session authenticated!");
      });

      client.on("auth_failure", (error) => {
        console.error("❌ WhatsApp authentication failed:", error);
        reject(error);
      });

      client.on("disconnected", (reason) => {
        console.log("❌ WhatsApp disconnected:", reason);
        client = null;
      });

      client.initialize();
    } catch (error) {
      console.error("❌ Error initializing WhatsApp client:", error);
      reject(error);
    }
  });
};

export { client };
export default whatsappConnect;
