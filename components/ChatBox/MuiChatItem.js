import React, {useEffect, useState} from 'react';
import {ChatItem} from 'react-chat-elements'
import db from "../../config/firebaseConfig";
import Loading from "../Loading";


function MuiChatItem(props) {
    const {chat} = props;
    const [lastMessage, setLastMessage] = useState();
    useEffect(() => {
        if (!chat) return;
        const subChats = db.collection("chatroom").doc(chat.id).collection("messages").orderBy("startedAt", "asc").onSnapshot(snap => {

            if (snap.empty) {
                setLastMessage({text: "Say hello!"})
            } else {
                let arr = [];
                snap.docs.forEach((doc) => {
                    arr.push(doc.data());
                })
                const last = arr.pop();
                setLastMessage(last);
            }
        });

        return () => {
            if (subChats) subChats();
        }
    }, [chat]);

    if (!chat || !lastMessage) return <Loading isNormal={true}/>;
    return (

        <ChatItem avatar={chat.photoGroup}
                  alt={'Reactjs'}
                  title={chat.title}
                  subtitle={lastMessage.text}
                  date={lastMessage.startedAt ? lastMessage.startedAt.toDate() : ""}
                  unread={0}/>

    );
}

export default MuiChatItem;