import firebase from "firebase/app";
import "firebase/auth";

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

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export default firebase;
