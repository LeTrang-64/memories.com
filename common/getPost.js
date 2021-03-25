import db from "../config/firebaseConfig";

export default (id, callback) => {
    const docRef = db.collection("Todos").doc(id);
    return docRef.onSnapshot(snap => {
        const newdata = snap.data();
        const authorId=newdata.userid;
        if (callback && typeof callback === "function") {
            callback(newdata)
        }
    })

}
