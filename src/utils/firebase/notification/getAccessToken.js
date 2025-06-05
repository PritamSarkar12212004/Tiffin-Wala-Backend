import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// get  access token
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const firebaseConfigPath = path.join(__dirname, "../../../../firebase-admin-sdk.json");


// Function to get an access token using Google OAuth2
async function getAccessToken() {
  const auth = new google.auth.GoogleAuth({
    keyFile: firebaseConfigPath,
    scopes: ["https://www.googleapis.com/auth/firebase.messaging"],
  });

  try {
    const accessToken = await auth.getAccessToken();
    console.log("Access Token:", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
}

export default getAccessToken;
