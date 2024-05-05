import {initializeApp} from "firebase/app";

/**
 * No env setup to streamline the process
 */
const firebaseConfig = {
    apiKey: "AIzaSyB0AhrUeGjfCBgDadMoE5fBU0Wib9XrhbU",
    authDomain: "uni-crossplatform.firebaseapp.com",
    databaseURL: "https://uni-crossplatform-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "uni-crossplatform",
    storageBucket: "uni-crossplatform.appspot.com",
    messagingSenderId: "280929281368",
    appId: "1:280929281368:web:3e6ecda5cee14a1741312d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
