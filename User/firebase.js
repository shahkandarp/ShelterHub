const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBJn1rP1xhHWtH_gUp8zBGS-BiH5dMu038",
//   authDomain: "pgrental-8e454.firebaseapp.com",
//   projectId: "pgrental-8e454",
//   storageBucket: "pgrental-8e454.appspot.com",
//   messagingSenderId: "155226346034",
//   appId: "1:155226346034:web:2e889f3a3d805d7d2de22b",
//   measurementId: "G-XNVEH6N01X"
// };
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRwdkY2l9OmULGP8C23L28Et7wWpmnlIc",
  authDomain: "ssip-images.firebaseapp.com",
  projectId: "ssip-images",
  storageBucket: "ssip-images.appspot.com",
  messagingSenderId: "409595732088",
  appId: "1:409595732088:web:f4da99e011b43c24834d8d",
  measurementId: "G-11GC93B9E6"
};

const firebaseApp = initializeApp(firebaseConfig);

module.exports = getStorage(firebaseApp);