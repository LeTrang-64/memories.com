import Head from 'next/head'
import styles from '../styles/Home.module.css'
import db from '../config/firebaseConfig'
import Link from 'next/link'
import AppBar from './components/AppBar';
import Posts from './components/Posts';
import { getStaticProps } from './api/document';
import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';


export default function Home() {


  const [data, setData] = useState([]);
  useEffect(() => {

    const sub = db.collection("Todos").onSnapshot(snap => {
      let arr = []
      console.log(snap);
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


  console.log(data);

  if (!data) return 'loadding'
  return (
    <div className={styles.container}>
      <Head>
        <title>Memories</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar />
      <div className={styles.main}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-between">
          <Col className="gutter-row" span={4} >

          </Col>
          <Col className="gutter-row" span={16} >
            <Link href="/AddEdit">
              <a>Add content</a>
            </Link>

            <Posts posts={data} className={styles.posts} />

          </Col>

          <Col className="gutter-row" span={4} ></Col>


        </Row>
        {/* <Link href="/AddEdit">
          <a>Add content</a>
        </Link>

        <Posts posts={data} className={styles.posts} /> */}
      </div>


    </div>
  )
}
