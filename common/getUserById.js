import db from "../config/firebaseConfig";

export default async (id,callback)=> {

    const userRef = db.collection("users").doc(id);
    try {
        const snapUser = await userRef.onSnapshot(snap => {
            if (callback && typeof callback === "function") {
                callback({ ...snap.data(), id: snap.id })
            }

        })
        const snapRates = await userRef.collection('rates').onSnapshot(snap => {

                if (snap) {
                    setRates(snap.docs.map(snap => ({ ...snap.data(), id: snap.id })))
                }

            }
        )
    } catch (e) {
        console.log(e);
    }

}