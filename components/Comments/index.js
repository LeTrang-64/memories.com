import React from 'react';
import styles from './Comments.module.css';
import { createElement, useState ,useEffect} from 'react';

import {Comment, Tooltip, Avatar, Input, Button,Form,Texta} from 'antd';
import { SendOutlined, FilterOutlined } from '@ant-design/icons';
import Cmt from "./Cmt";
import db, {firebaseAuth, Timestamp} from "../../config/firebaseConfig";


const { TextArea } = Input;

function Comments(props) {
    const {idArticle}=props;
    const [value,setValue]=useState("");
    const user=firebaseAuth.currentUser;
    const [cmts,setCmts]=useState([]);

    // -------------get-comment-list----------

    const docRef = db.collection("Todos").doc(idArticle);
    useEffect(async ()=>{
        const sub=await docRef.collection("comments").onSnapshot(snapshot => {
            if(snapshot){
                setCmts(snapshot.docs.map((snap)=>({...snap.data(),idCmt:snap.id})))
            }
        })

        return ()=>{
            if(sub) sub();
        }

    },[])
    console.log("list cmt",cmts)



    const handleSubmit=(e)=>{
        e.preventDefault();
        const text = value.trim();
        if(text.length>0) sendComment(value,user);


    }
    function sendComment(value,user){
        const time = Timestamp.now();

        docRef.collection("comments").doc().set({
            idUser:user.uid,
            cmtLine:value,
            timeSend:time,
        }).then(() => {
            console.log("User successfully cmt!")


        })
            .catch((error) => {
                console.error("Error writing cmt: ", error);
            });
        setValue("");


    }
    function handleTypeChange(e) {
        setValue(e.target.value);
    }

    return (
        <div className={styles.comments} >
            <div className={styles.comments_header}>
                <div>Bình luận của thành viên</div>
                <div className={styles.comment_colection}>Sap xep
                <FilterOutlined />
                </div>

            </div>
            <div className={styles.comments_box}>
                {cmts?.map((cmt,index)=><Cmt key={index} comment={cmt}/>)
                }
            </div>
            <div className={styles.comment_form}>
                <form className="message-form" onSubmit={handleSubmit}>
                    <input
                        className="message-input"
                        placeholder="send me message..."
                        value={value}
                        onChange={handleTypeChange}
                        onSubmit={handleSubmit}
                    />

                    <button type="submit" className="send-button">
                        <SendOutlined className="send-icon" />
                    </button>
                </form>
            </div>


        </div>
    );
}

export default Comments;