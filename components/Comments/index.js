import React from 'react';
import styles from './Comments.module.css';
import { useState ,useEffect} from 'react';

import {Comment, Tooltip, Avatar, Input, Button,Form,Texta} from 'antd';
import { SendOutlined, FilterOutlined ,CommentOutlined } from '@ant-design/icons';
import Cmt from "./Cmt";
import db, {firebaseAuth, Timestamp} from "../../config/firebaseConfig";
import Message from "./Message";


const { TextArea } = Input;

function Comments(props) {
    const {idArticle}=props;
    const [cmts,setCmts]=useState([]);

    // -------------get-comment-list----------

    const docRef = db.collection("Todos").doc(idArticle);
    useEffect(()=>{
        const sub=docRef.collection("comments").orderBy("timeSend","desc").onSnapshot(snapshot => {
            if(snapshot){
                setCmts(snapshot.docs.map((snap)=>({...snap.data(),idCmt:snap.id})));
                console.log(snapshot.docs.map((snap)=>({...snap.data(),idCmt:snap.id})))
            }
        })

        return ()=>{
            if(sub) sub();
        }

    },[])
    console.log(cmts);



    return (
        <div className={styles.comments} >
            <div className={styles.comment_form}>
                <Message idArticle={idArticle} />

            </div>
            <div className={styles.comments_header}>
                <div>Bình luận của thành viên</div>
                <div className={styles.comment_colection}>Sap xep
                <FilterOutlined />
                </div>

            </div>
            <div className={styles.comments_box}>
                {cmts.length>0? cmts.map((cmt,index)=><Cmt key={index} comment={cmt}/>):
                    <div className={styles.comments_empty}>
                        <CommentOutlined style={{fontSize: '50px', opacity:'0.3'}} />
                        <div style={{opacity:'0.3'}}>Hãy là người bình luận đầu tiên</div>
                    </div>
                }
            </div>



        </div>
    );
}

export default Comments;