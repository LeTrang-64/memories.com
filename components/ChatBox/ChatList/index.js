import React, {useEffect, useState} from 'react';
import MuiChatList from "../MuiChatList";
import styles from "./ChatList.module.css"
import {Button} from "antd";
import db, {firebaseAuth} from "../../../config/firebaseConfig";
import Loading from "../../Loading";

function ChatList(props) {
    const {handleActiveChat} = props;

    const currentUser = firebaseAuth.currentUser;
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!currentUser)
            return null;
        const subChats = db.collection("chatroom").where("usersId", "array-contains", currentUser.uid).onSnapshot(snapshots => {
            setChats(snapshots.docs.map(snap => ({...snap.data(), id: snap.id})))
        })

        return () => {
            if (subChats)
                subChats()
        }
    }, [currentUser])

    if (!chats) return <Loading/>

    return (
        <div className={styles.chat_list}>

            <div>
                <MuiChatList chats={chats} handleActiveChat={handleActiveChat}/>
            </div>
            <Button>Xem them</Button>
        </div>
    );
}

export default ChatList;