import React, {useEffect, useState} from 'react';
import MuiChatList from "../MuiChatList";
import styles from "./ChatList.module.css"
import {Button, Form, Input} from "antd";
import db, {firebaseAuth, Timestamp} from "../../../config/firebaseConfig";
import Loading from "../../Loading";

const validateMessages = {

    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },

};

function ChatList(props) {
    const {handleActiveChat, handleShow} = props;
    const currentUser = firebaseAuth.currentUser;
    const [chats, setChats] = useState([]);
    const [form] = Form.useForm();


// ----------------get information of roomchat-------
    useEffect(() => {
        if (!currentUser)
            return null;
        const subChats = db.collection("chatroom").where("usersId", "array-contains", currentUser.uid)
            .orderBy("startedAt", "desc")
            .onSnapshot(snapshots => {
                setChats(snapshots.docs.map(snap => ({...snap.data(), id: snap.id})))
            })

        return () => {
            if (subChats)
                subChats()
        }
    }, [currentUser]);

    const onFinish = (values) => {
        createGroup(values)
        form.resetFields();
    };

    function createGroup(values) {
        const time = Timestamp.now();
        db.collection("chatroom").doc().set({
            owner: currentUser.uid,
            photoGroup: "https://banner2.cleanpng.com/20180410/ohw/kisspng-computer-icons-business-management-social-media-se-people-icon-5accf79c3f0f10.7537751915233821722583.jpg",
            title: values.title,
            usersId: [currentUser.uid],
            startedAt: time
        })
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }


    if (!chats) return <Loading isNormal={true}/>

    return (
        <div className={styles.chat_list}>
            <div className={styles.chat_list_component}>
                <MuiChatList chats={chats} handleActiveChat={handleActiveChat} handleShow={handleShow}/>
            </div>
            <div>
                <Form form={form} className={styles.chat_list_form} name="nest-messages" onFinish={onFinish}>
                    <Form.Item name={'title'} rules={[
                        {
                            required: true,
                            message: 'Please input title group',
                        },
                    ]}>
                        <Input/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            +
                        </Button>
                    </Form.Item>
                </Form>

            </div>
        </div>
    );
}

export default ChatList;
