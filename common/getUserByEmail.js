import db from "../config/firebaseConfig";

export default (email, callback) => {
    const userRef = db.collection("users").where("email", "==", email);
    userRef.get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                return alert("dont fin account")
            }
            querySnapshot.forEach((doc) => {
                const user = doc.data();
                if (callback && typeof callback === "function") {
                    callback(user);
                }
            });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
}