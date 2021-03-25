import db from "../config/firebaseConfig";

export default (id,callback) => {
    const docRef = db.collection("users").doc(id);
    return docRef.onSnapshot(snap => {
        const user = snap.data();
        if (callback && typeof callback === "function") {
            callback(user);
        }
    })

}