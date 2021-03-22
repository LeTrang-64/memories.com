import db from '../../config/firebaseConfig'

export async function getStaticProps() {
    const arr = new Array();

    db.collection("todos").get().then((snap) => {
        snap.forEach((doc) => {

            const data = {
                id: doc.id,
                ...doc.data()
            }
            arr.push(data);

        });
    });
    console.log(arr);

    if (!data) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { data }, // will be passed to the page component as props
    }
}