import React, {useEffect, useState} from 'react';
import {MessageList} from "react-chat-elements";
import getUser from "../../common/getUser";
import Loading from "../Loading";
import {Avatar} from "antd";
import styles from "./ChatList/ChatList.module.css"

function TheirMessage(props) {
    const {message, lastMessage} = props;
    const [user, setUser] = useState();

    useEffect(() => {
        const sub = getUser(message.userid, setUser);
        return () => {
            if (sub) sub()
        }
    }, [])

    if (!user) return <Loading/>
    const time = message?.startedAt?.toDate();
    const isFirstMess = !lastMessage || lastMessage.userid !== message.userid; //neu la tin nhan dau tien hoac tin nhan giua 2 ng khac
                                                                               ////nhau thi hien avatar

    return (
        <div className={styles.message}>
            <div className={styles.messages_icon}>
                {isFirstMess ?
                    <Avatar size={36} src={user.photoURL} style={{cursor: 'pointer'}} onClick={() => router.push({
                        pathname: '/Profile',
                        query: {id: user.uid},
                    })}/>
                    : <div style={{width: "36px"}}></div>

                }
            </div>
            <div className={styles.messages_text}>
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={[
                        {
                            position: 'left',
                            type: message.type,
                            text: message.text,
                            date: time,
                        },

                    ]}/>
            </div>


        </div>

    );
}

export default TheirMessage;