import React, {useState} from 'react';
import styles from './AppBar.module.css'

import Image from 'next/image'
import {Avatar, Button, Dropdown, Menu, Popover} from 'antd';
import {useRouter} from 'next/router';
import {firebaseAuth} from '../../config/firebaseConfig';
import {DownCircleTwoTone, MessageTwoTone, UserOutlined} from '@ant-design/icons';
import ChatList from "../ChatBox/ChatList";
import ChatFeed from "../ChatBox/ChatFeed";


const myLoader = ({src, width, quality}) => {
    return src
}


function AppBar(props) {
    const router = useRouter();
    const {currentUser} = props;
    const [activeChat, setActiveChat] = useState(false);
    const [chat, setChat] = useState();

    // console.log(currentUser);
    const text = <span>Messages</span>;
    const content = (
        <ChatList user={currentUser} handleActiveChat={handleActiveChat}/>
    );

    const handleLogout = () => {

        firebaseAuth.signOut().then(() => {
            // Sign-out successful.
            console.log('logout success');
            router.reload();
            // window.location.reload();
        }).catch((error) => {
            console.log(error)// An error happened.
        });
    }


    function handleActiveChat(chat) {
        setChat(chat);
        setActiveChat(true);
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <Button onClick={handleLogout}>Logout</Button>
            </Menu.Item>
        </Menu>
    )


    return (

        <div className={styles.appbar}>

            <div className={styles.appbar_logo}>
                <Avatar size={24} style={{backgroundColor: "#E60023"}}><span
                    className={styles.appbar_logo_icon}>R</span></Avatar>
                <Button onClick={() => router.push('/')}>Home</Button>
            </div>



            <div className={styles.appbar_title}>
                <strong>MEMORIEs</strong>

                <Image
                    src="/images/memories.png"
                    alt="Picture of the author"
                    width={60}
                    height={60}
                    loader={myLoader}
                />
            </div>

            {!currentUser ?
                (<div className={styles.user_item}>
                    <Button onClick={() => router.push('/Login')}>Login</Button>
                    <Avatar size={36} icon={<UserOutlined/>} style={{cursor: 'pointer'}}/>
                </div>)

                : (
                    <div className={styles.user_item}>
                        <Popover
                            overlayClassName={styles.antd_popover}
                            placement="bottom" title={text} content={content} trigger="click">
                            <div className={styles.appbar_message_icon}><MessageTwoTone style={{fontSize: "20px"}}/>
                            </div>
                        </Popover>
                        <Dropdown overlay={menu} placement="bottomCenter" arrow>
                            <div className={styles.appbar_message_icon}><DownCircleTwoTone style={{fontSize: "20px"}}/>
                            </div>
                        </Dropdown>
                        <h3>{currentUser?.displayName}</h3>
                        <Avatar size={36} src={currentUser?.photoURL} style={{cursor: 'pointer'}}
                                onClick={() => router.push({
                                    pathname: '/Profile',
                                    query: {id: currentUser.uid},
                                })}/>

                    </div>)
            }
            {activeChat && <ChatFeed chat={chat} handleActiveChat={() => setActiveChat(false)}/>}

        </div>

    );
}

export default AppBar;