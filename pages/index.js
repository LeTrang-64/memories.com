import Head from 'next/head'
import styles from '../styles/Home.module.css'
import db, {firebaseAuth} from '../config/firebaseConfig'
import AppBar from '../components/AppBar';
import Posts from '../components/Posts';
import React, {useEffect, useState} from 'react';
import {Avatar, Col, Row} from 'antd';
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import MenuBar from "../components/MenuBar";
import {useRouter} from "next/router";


export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [queryData, setQueryData] = useState();


  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("not login");
        return;
      }
      const token = await user.getIdToken();

      try {
        await db.collection("users").doc(user.uid).set({
          uid: user.uid,
          displayName: user.displayName || null,
          email: user.email || null,
          phoneNumber: user.phoneNumber || null,
          photoURL: user.photoURL,
        })
        setUser(user);
        console.log("Login successfully")
      } catch (e) {
        console.log(e.toString())
      }
    });

    return () => {
      if (unregisterAuthObserver) unregisterAuthObserver();
    }
  }, []);

  // ----------------------get Data----------


  useEffect(() => {
    const sub = db.collection("todos")
      .onSnapshot(snap => {
        let arr = [];
        snap.forEach((doc) => {
          const newData = {
            id: doc.id,
            ...doc.data()
          }
          arr.push(newData)
        });
        setData(arr);
        setQueryData(arr)
        console.log('get data done')
      })

    return () => {
      if (sub) sub()
    }
  }, [])

  const handleClick = (e) => {
    if (e.key === "all") {
      setQueryData(data);
      return;
    }
    const arrNewdata = data.filter((x) => x.category === e.key);
    setQueryData(arrNewdata);
  }

  const handleSearch = (value) => {
    const arrNewdata = data.filter((x) => {
      return x.title.toLowerCase().includes(value.toLowerCase())
    });
    setQueryData(arrNewdata);
  }



  if (!data) return <Loading/>

  return (
      <div className={styles.container}>
        <Head>
          <title>Memories</title>
          <link rel="icon" href="/favicon.ico"/>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Lobster&display=swap');
          </style>
        </Head>

        <AppBar currentUser={user}/>

        <div className={styles.main}>
          <Row>
            <Col span={5}>
              <MenuBar handleClick={handleClick}/>
            </Col>
            <Col span={14}>
              <Posts posts={queryData} className={styles.posts}/>
            </Col>
            <Col span={5}>
              <div className={styles.control_box}>
                <SearchBar handleSearch={handleSearch}/>
              </div>
              <div className={styles.add_icon}>
                <Avatar size={64} style={{backgroundColor: "#E60023", fontSize: "20px"}}
                        onClick={() => router.push('/AddEdit')}>+</Avatar>
              </div>
            </Col>

        </Row>

      </div>

    </div>
  )
}
