import React from 'react';
import Loading from "../Loading";
import {firebaseAuth} from "../../config/firebaseConfig";
import {findIndex} from 'lodash'
import MuiChatItem from "./MuiChatItem";

function MuiChatList(props) {
    const currentUser = firebaseAuth.currentUser;
    const {chats, handleActiveChat} = props;
    console.log(chats);
    const renderChatList = () => {
        return chats.map((chat, index) => {
            const theirInfo = findIndex(chat.users, function (o) {
                return o.idUser != currentUser.uid;
            });
            //vi tri cua friend trong group chat
            const otherUser = {
                id: chat.users[theirInfo].idUser,
                photoUrl: chat.users[theirInfo].photoUrl,
                displayName: chat.users[theirInfo].displayName,
            }
            return (
                <div key={`${chat.id}`} onClick={() => handleActiveChat(chat, otherUser)}>
                    <MuiChatItem
                        avatar={chat.users[theirInfo].photoUrl}
                        alt={'Reactjs'}
                        title={chat.users[theirInfo].displayName}
                        subtitle={'What are you doing?'}
                        date={new Date()}
                        unread={0}/>
                </div>
            )
        })
    }


    if (!chats?.length) return <Loading isNormal={'default'}/>;

    return (
        <div>
            {renderChatList()}
        </div>
    );
}

export default MuiChatList;