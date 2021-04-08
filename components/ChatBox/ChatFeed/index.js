import React, {useEffect, useRef, useState} from 'react';
import db, {firebaseAuth} from '../../../config/firebaseConfig';
import MuiInput from '../MuiInput';
import MuiNavbar from '../MuiNavbar';
import styles from "../ChatFeed/ChatFeed.module.css"
import Loading from '../../Loading';
import MyMessage from "../MyMessage";
import TheirMessage from "../TheirMessage";


function ChatFeed(props) {
    const {chat, handleActiveChat} = props;
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const scrollEnd = useRef(null);


    useEffect(() => {
        const unregisterAuthObserver = firebaseAuth.onAuthStateChanged(async (user) => {
            if (!user) {
                console.log("not login");
                return;
            }
            setUser(user);
        });
        return () => {
            if (unregisterAuthObserver) unregisterAuthObserver();
        }
    }, []);

    useEffect(() => {
        if (!chat)
            return null;
        const subChats = db.collection("chatroom").doc(chat.id).collection("messages").orderBy("startedAt", "asc").onSnapshot(snapshots => {
            setMessages(snapshots.docs.map(snap => ({...snap.data(), id: snap.id})))
        })

        return () => {
            if (subChats)
                subChats()
        }
    }, [chat])


    function scrollToBottom() {
        scrollEnd.current?.scrollIntoView({block: "end"});
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);


    const renderMessage = () => {
        return messages.map((message, index) => {
            const lastMessage = index === 0 ? null : messages[index - 1];
            const myMessage = user.uid === message.userid;

            return (
                <div key={`msg_${index}`} style={{width: "100%"}}>
                    <div className="message-block">
                        {myMessage ? (
                            <MyMessage message={message} lastMessage={lastMessage}/>
                        ) : (
                            <TheirMessage
                                message={message}
                                lastMessage={lastMessage}
                            />
                        )}
                    </div>
                </div>
            );
        })

    }
    if (!user || !chat || !messages) return <Loading/>
    return (
        <div className={styles.chat_feed}>
            <div>
                <div>
                    <MuiNavbar chat={chat} handleActiveChat={handleActiveChat}/>
                </div>
            </div>

            <div className={styles.messages_wrap}>
                {renderMessage()}
                <div ref={scrollEnd}></div>
            </div>
            <div>
                <MuiInput currentUser={user} activeChatId={chat.id}/>
            </div>
        </div>

    );
}

export default ChatFeed;