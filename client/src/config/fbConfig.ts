import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY || "AIzaSyDtJgb1-EaiakmzlNbVcDhHwzHMwwCkwkE",
  authDomain: process.env.REACT_APP_AUTHDOMAIN || "applied-learning-initiat-dfcfe.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASEURL || "https://applied-learning-initiat-dfcfe.firebaseio.com",
  projectId: process.env.REACT_APP_PROJECTID || "applied-learning-initiat-dfcfe",
  storageBucket: process.env.REACT_APP_STORAGEBUCKET || "applied-learning-initiat-dfcfe.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID || "859859235960",
  appId: process.env.REACT_APP_APPID || "1:859859235960:web:c8dc4ee862b84ffd4ea98d",
  measurementId: process.env.REACT_APP_MEASUREMENTID || "G-VGGMVZL8Q1",
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
