import React from 'react';
import Loading from "../Loading";
import {firebaseAuth} from "../../config/firebaseConfig";
import MuiChatItem from "./MuiChatItem";

function MuiChatList(props) {
    const currentUser = firebaseAuth.currentUser;
    const {chats, handleActiveChat, handleShow} = props;


    if (!chats) return <Loading isNormal={'default'}/>;

    function handleClick(chat) {
        handleActiveChat(chat)
    }

    return chats.map((chat, index) =>
        <div key={`${chat.id}_${index}`} onClick={() => handleClick(chat)} style={{height: '72px'}}>
            <MuiChatItem
                chat={chat}/>
        </div>
    );
}

export default MuiChatList;