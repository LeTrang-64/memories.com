import db from "../config/firebaseConfig";
import firebase from 'firebase';


const handleAction= (action,user,data) => {
    const docRef = db.collection("todos").doc(data.id);

    switch (action) {
        case "LIKE": {
            try {
                const status = data.like.indexOf(user.uid) !== -1;
                if (status) {
                    docRef.update({
                        like: firebase.firestore.FieldValue.arrayRemove(user.uid),
                    })

                } else {
                    docRef.update({
                        like: firebase.firestore.FieldValue.arrayUnion(user.uid),

                    })
                }

            } catch (e) {
                console.log(e);
            }
        }
            break;
        case "DISLIKE": {
            try {
                const arr = data.dislike;
                const status = data.dislike.indexOf(user.uid) !== -1;
                if (status) {
                    docRef.update({
                        dislike: firebase.firestore.FieldValue.arrayRemove(user.uid),
                    })

                } else {
                    docRef.update({
                        dislike: firebase.firestore.FieldValue.arrayUnion(user.uid),
                    })
                }

            } catch (e) {
                console.log(e);
            }
        }
            break;

        default:
            break;
    }

}
const handleActionCmt= (action,user,cmt,idArticle) => {
    const docRef = db.collection("todos").doc(idArticle);
    const cmtRef=docRef.collection("comments").doc(cmt.idCmt);

    switch (action) {
        case "LIKE": {
            try {
                const status = cmt.like.indexOf(user.uid) !== -1;
                if (status) {
                    cmtRef.update({
                        like: firebase.firestore.FieldValue.arrayRemove(user.uid),
                    })

                } else {
                    cmtRef.update({
                        like: firebase.firestore.FieldValue.arrayUnion(user.uid),

                    })
                }

            } catch (e) {
                console.log(e);
            }
        }
            break;
        case "DISLIKE": {
            try {

                const status = cmt.dislike.indexOf(user.uid) !== -1;
                if (status) {
                    cmtRef.update({
                        dislike: firebase.firestore.FieldValue.arrayRemove(user.uid),
                    })

                } else {
                    cmtRef.update({
                        dislike: firebase.firestore.FieldValue.arrayUnion(user.uid),
                    })
                }

            } catch (e) {
                console.log(e);
            }
        }
            break;

        default:
            break;
    }

}
export {handleAction,
    handleActionCmt};