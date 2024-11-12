import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmGE_HiOA2qEsLoW1aBv_px9-UkIj9ytU",
  authDomain: "quickie-60768.firebaseapp.com",
  projectId: "quickie-60768",
  storageBucket: "quickie-60768.firebasestorage.app",
  messagingSenderId: "788690329919",
  appId: "1:788690329919:web:72ae6e796cac8d6a9ab38a",
  
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 