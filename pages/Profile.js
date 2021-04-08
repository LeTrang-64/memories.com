import React, {useEffect, useState} from 'react';
import styles from "../styles/Profile.module.css"
import AppBar from "../components/AppBar";
import db, {firebaseAuth} from "../config/firebaseConfig"
import {Col, Row} from "antd";

import UserProfile from "../components/UserProfile";
import PostOfUser from "../components/Posts/PostOfUser";
import {useRouter} from "next/router";
import getUser from "../common/getUser";
import Loading from "../components/Loading";


function Profile(props) {
    const currentuser=firebaseAuth.currentUser;
    const router=useRouter();
    const { id } = router.query;
    console.log(id);
    const [user, setUser] = useState();
    const [data, setData] = useState([]);
    const [rates, setRates] = useState([]);
    useEffect(()=>{
        if(!id)
            return;

        const sub=getUser(id,setUser)
// ------------get Rate------------
        const userRef = db.collection("users").doc(id);
        const snapRates =  userRef.collection('rates').onSnapshot(snap => {
            if (snap) {
                setRates(snap.docs.map(snap => ({...snap.data(), id: snap.id})))
            }
        })

        return ()=>{
            if(sub) sub();
            if(snapRates) snapRates();
        }
    },[id])

    useEffect(()=>{
        if(!id)
            return;
        const snapDatas = db.collection("todos").where("userid","==",id)
            .onSnapshot(snap => {
                let arr = []
                snap.forEach((doc) => {
                    const newData = {
                        id: doc.id,
                        ...doc.data()
                    }
                    arr.push(newData)
                });
                setData(arr);
                console.log('get data done')
            })

        return () => {
            if (snapDatas) snapDatas()
        }

    },[id])

    if (!data || !user) return <Loading/>
    return (
        <div className={styles.profile}>
            <AppBar currentUser={currentuser}/>
            {/*<div className={styles.profile_cover}></div>*/}
            <div className={styles.profile_container}>
                <Row  >
                    <Col span={6} >
                        <UserProfile user={user} rates={rates}/>

                    </Col>
                    <Col span={16} >
                        <PostOfUser data={data} user={user}/>

                    </Col>
                    <Col span={2} >


                    </Col>




                </Row>
            </div>


        </div>
    );
}

export default Profile;