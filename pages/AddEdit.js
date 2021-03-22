import React, { useEffect, useState } from 'react';
import FormInPut from './components/FormInput';
import db from '../config/firebaseConfig'
import styles from '../styles/AddEdit.module.css'
import { useRouter } from 'next/router';




function AddEdit(props) {
    const router = useRouter();
    const { id } = router.query;
    const [fields, setFields] = useState(null);
    useEffect(() => {
        const sub = db.collection("Todos").doc(id).onSnapshot(snap => {
            const newdata = { id: id, ...snap.data() }

            setFields(newdata);
            console.log('get data done')
        })

        return () => {
            if (sub) sub()
        }

    }, [id])



    return (
        <div className={styles.form_add}>
            <FormInPut fields={fields}
            />
        </div>
    );
}

export default AddEdit;