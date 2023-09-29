// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAuqwGQsCmb6s3IFjSLgNfuQWzMCJU_1fY",
    authDomain: "user-email-password-auth-54f50.firebaseapp.com",
    projectId: "user-email-password-auth-54f50",
    storageBucket: "user-email-password-auth-54f50.appspot.com",
    messagingSenderId: "995352424488",
    appId: "1:995352424488:web:bba8861650f947b560051d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export default app;

const auth= getAuth(app);
export default auth;
