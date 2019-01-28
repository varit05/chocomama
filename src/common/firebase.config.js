import Vue from "vue";
import Firebase from "firebase";
import VueFire from "vuefire";

Vue.use(VueFire);

const config = {
  apiKey: "AIzaSyAQkSeqPUdW2SFP-VRMXCjjZthusRUNg88",
  authDomain: "chocomama-4af7b.firebaseapp.com",
  databaseURL: "https://chocomama-4af7b.firebaseio.com",
  projectId: "chocomama-4af7b",
  storageBucket: "chocomama-4af7b.appspot.com",
  messagingSenderId: "139803431625"
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(config);
}

// firebase utils
const db = Firebase.database();
const auth = Firebase.auth();
const currentUser = auth.currentUser;

const usersCollection = db.ref("users");
const productsCollection = db.ref("products");

const fb = { db, auth, currentUser, usersCollection, productsCollection };

export default fb;
