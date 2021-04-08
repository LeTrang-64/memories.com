import React, {useEffect, useState} from 'react';
import {Navbar} from 'react-chat-elements'
import {CloseOutlined, DownCircleTwoTone, UserAddOutlined} from '@ant-design/icons'
import {Avatar, Button, Dropdown, Form, Input, Menu} from "antd";
import {useRouter} from "next/router";
import Loading from "../Loading";
import styles from "./ChatList/ChatList.module.css";
import db from "../../config/firebaseConfig";
import firebase from 'firebase';
import getUserByEmail from "../../common/getUserByEmail";

const validateMessages = {

    types: {
        email: 'Type a valid email!',
    },

};

function MuiNavbar(props) {
    const {chat, handleActiveChat} = props;
    const router = useRouter();
    const [showInput, setShowInput] = useState(false);
    const [form] = Form.useForm();
    const [newUser, setNewUser] = useState();

    const onFinish = (values) => {
        getUserByEmail(values.email, setNewUser);
        form.resetFields();
    }

    useEffect(() => {
        if (!newUser) return;
        addNewFriend(newUser)
        setNewUser(null);
    }, [newUser])

    function addNewFriend(user) {
        const chatRef = db.collection("chatroom").doc(chat.id);
        const status = chat.usersId.indexOf(user.uid) !== -1;
        if (status) {
            alert("Friend had been in group");
        } else {
            chatRef.update({
                usersId: firebase.firestore.FieldValue.arrayUnion(user.uid),
            })
        }
    }

    function handleChangePhoto() {

    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Button onClick={handleChangePhoto}>Change photo</Button>
            </Menu.Item>
        </Menu>
    )

    if (!chat) return <Loading/>;
    return (
        <div className={styles.nav_bar_feed}>
            <Navbar
                left={
                    <div>
                        <Avatar size={36} src={chat.photoGroup}/>
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                            <div className={styles.dropdown_icon}><DownCircleTwoTone style={{fontSize: "20px"}}/></div>
                        </Dropdown>
                    </div>
                }
                center={
                    <div>{chat.title}</div>
                }
                right={
                    <div>
                        <Button type={"none"} onClick={() => setShowInput(!showInput)}><UserAddOutlined/></Button>
                        <Button type={"none"} onClick={() => handleActiveChat()}><CloseOutlined/></Button>

                    </div>
                }/>
            {showInput &&
            <Form form={form} className={styles.chat_list_form} name="nest-messages" onFinish={onFinish}
                  validateMessages={validateMessages}>
                <Form.Item name={'email'} rules={[{type: 'email', required: true}]}>
                    <Input/>
                </Form.Item>
            </Form>
            }
        </div>
    );
}

export default MuiNavbar;