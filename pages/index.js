import Head from 'next/head'
import styles from '../styles/Home.module.css'
import db from '../config/firebaseConfig'
import { firebaseAuth } from '../config/firebaseConfig'
import Link from 'next/link'
import AppBar from '../components/AppBar';
import Posts from '../components/Posts';
import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Loading from "../components/Loading";





export default function Home() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("not login");
        return;
      }
      console.log("login user", user.displayName);
      const token = await user.getIdToken();
      console.log('token', token);

      console.log(user.uid);
      await db.collection("users").doc(user.uid).set({
        uid: user.uid,
        displayName: user.displayName || null,
        email: user.email || null,
        phoneNumber: user.phoneNumber || null,
        photoURL: user.photoURL,
        rates:[],

      })
        .then(() => {
          console.log("User successfully login!")
        })
        .catch((error) => {
          console.error("Error writing user: ", error);
        });
      setUser(user);
    });
    return () => {
      if(unregisterAuthObserver) unregisterAuthObserver();
    } // Make sure we un-register Firebase observers when the component unmounts.
  }, []);
  // ----------------------get Data----------

  const [data, setData] = useState([]);
  useEffect(() => {

    const sub = db.collection("Todos").onSnapshot(snap => {
      let arr = []
      // console.log(snap);
      snap.forEach((doc) => {
        const newData = {
          id: doc.id,
          ...doc.data()
        }
        arr.push(newData)
      });
      setData(arr)
      console.log('get data done')
    })

    return () => {
      if (sub) sub()
    }
  }, [])



  if (!data) return <Loading />
  return (
    <div className={styles.container}>
      <Head>
        <title>Memories</title>
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
</style>
      </Head>
      <AppBar currentUser={user} />
      <div className={styles.main}>
        <Row  >
          <Col span={4} >
          </Col>
          <Col span={16} >
            <Link href="/AddEdit">
              <a>Add content</a>
            </Link>
            <Posts posts={data} className={styles.posts} />
          </Col>

          <Col span={4} ></Col>


        </Row>

      </div>


    </div>
  )
}
