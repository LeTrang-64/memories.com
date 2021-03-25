import 'firebase/firestore';
import 'firebase/storage';
import firebase from 'firebase';


var firebaseConfig = {
    apiKey: "AIzaSyBPzf15doo0tmdww_UjMNTni9scFBs3mmw",
    authDomain: "fir-demo1-6b93b.firebaseapp.com",
    databaseURL: "https://fir-demo1-6b93b-default-rtdb.firebaseio.com",
    projectId: "fir-demo1-6b93b",
    storageBucket: "fir-demo1-6b93b.appspot.com",
    messagingSenderId: "550635112193",
    appId: "1:550635112193:web:b981d1d989b57b96a4bd00",
    measurementId: "G-G4Z2PW3BSP"
};
// Initialize Firebase
if (!firebase?.apps?.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
var storage = firebase.storage();
var Timestamp = firebase.firestore.Timestamp;
const firebaseAuth = firebase.auth();

export default db;
export {
    storage,
    Timestamp,
    firebaseAuth,
}