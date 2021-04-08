import React, {useEffect, useState} from 'react';
import styles from './Comments.module.css';

import {Input} from 'antd';
import {CommentOutlined, FilterOutlined} from '@ant-design/icons';
import Cmt from "./Cmt";
import db from "../../config/firebaseConfig";
import Message from "./Message";


const { TextArea } = Input;

function Comments(props) {
    const {idArticle}=props;
    const [cmts,setCmts]=useState([]);

    // -------------get-comment-list----------

    const docRef = db.collection("todos").doc(idArticle);
    useEffect(()=>{
        const sub=docRef.collection("comments").orderBy("timeSend","desc").onSnapshot(snapshot => {
            if(snapshot){
                setCmts(snapshot.docs.map((snap)=>({...snap.data(),idCmt:snap.id})));
            }
        })

        return ()=>{
            if(sub) sub();
        }

    },[])



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
                {cmts.length>0? cmts.map((cmt,index)=><Cmt key={index} comment={cmt} idArticle={idArticle}/>):
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