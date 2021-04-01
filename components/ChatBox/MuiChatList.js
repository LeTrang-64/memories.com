import React from 'react';
import {ChatList} from 'react-chat-elements';
import Loading from "../Loading";

function MuiChatList(props) {
    const {chats} = props;

    const list = chats?.map((room) => {
        return {
            avatar: 'https://facebook.github.io/react/img/logo.svg',
            alt: 'Reactjs',
            title: 'Facebook',
            subtitle: 'What are you doing?',
            date: new Date(),
            unread: 0,
        }
    })

    if (!chats?.length) return <Loading isNormal={'default'}/>;

    return (
        <ChatList
            className='chat-list'
            dataSource={list}
        />
    );
}

export default MuiChatList;