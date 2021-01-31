import firebase from "firebase/app";
import "firebase/auth";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY || "",
  authDomain: process.env.REACT_APP_AUTH_DOMAIN || "",
  databaseURL: process.env.REACT_APP_DATABASE_URL || "",
  projectId: process.env.REACT_APP_PROJECT_ID || "",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "",
  appId: process.env.REACT_APP_APP_ID || "",
  measurementId: process.env.REACT_APP_MEASUREMENT_ID || "",
};

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Email as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: (user) => {
      const userInfo = user.additionalUserInfo;
      // Send verification email function
      async function sendVerification() {
        await user.user
          .sendEmailVerification()
          .then(() => console.log("check email"))
          .catch((error) => console.log(error));
      }

      // If user is new and they signed in via Google
      if (userInfo.isNewUser) {
        // Send email verification if signed in through EmailAuth (not Google/FB, etc)
        if (userInfo.providerId === "password") {
          sendVerification();
        }
      }
      return false;
    },
  },
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
