import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyDtJgb1-EaiakmzlNbVcDhHwzHMwwCkwkE",
  authDomain: "applied-learning-initiat-dfcfe.firebaseapp.com",
  databaseURL: "https://applied-learning-initiat-dfcfe.firebaseio.com",
  projectId: "applied-learning-initiat-dfcfe",
  storageBucket: "applied-learning-initiat-dfcfe.appspot.com",
  messagingSenderId: "859859235960",
  appId: "1:859859235960:web:c8dc4ee862b84ffd4ea98d",
  measurementId: "G-VGGMVZL8Q1",
};

export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Email as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
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
        // New User - Create user in database
        const firstName = user.user.displayName.split(" ")[0];
        const lastName = user.user.displayName.split(" ")[1];
        const newUser = {
          uid: user.user.uid,
          firstname: firstName,
          lastname: lastName,
          email: user.user.email,
          image: user.user.photoURL || "",
          university: "", // tentative until post-signup questions are implemented
          year: "", // tentative until post-signup questions are implemented
          skills: "", // tentative until post-signup questions are implemented
          programming: "", // tentative until post-signup questions are implemented
          resume: "", // tentative until post-signup questions are implemented
          following: [],
          faculty: false, // tentative until post-signup questions are implemented
          admin: false,
        };

        // Create new user in database
        axios
          .post(`http://localhost:5000/users/${user.user.uid}`, newUser)
          .then(() => console.log("post is done"))
          .catch((error) => console.log(error));

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
