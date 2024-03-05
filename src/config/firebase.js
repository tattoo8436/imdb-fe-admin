import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDE5MG10aZ3dflx1YMRZp457kTLY50RLiw",
  authDomain: "imdb-9b941.firebaseapp.com",
  projectId: "imdb-9b941",
  storageBucket: "imdb-9b941.appspot.com",
  messagingSenderId: "169707706311",
  appId: "1:169707706311:web:625dde087b52bf9996abe2",
};

const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
