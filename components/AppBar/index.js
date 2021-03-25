import React from 'react';
import styles from './AppBar.module.css'

import Image from 'next/image'
import { Avatar, Button } from 'antd';
import { useRouter } from 'next/router';
import { firebaseAuth } from '../../config/firebaseConfig';
import { UserOutlined } from '@ant-design/icons';

const myLoader = ({ src, width, quality }) => {
    return src
}

function AppBar(props) {
    const router = useRouter();
    const { currentUser } = props;
    // console.log(currentUser);

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

    return (

        <div className={styles.appbar}>

            <div className={styles.appbar_logo}>
                <span onClick={() => router.push('/')}>ReView</span>
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

            {!currentUser ? (<div className={styles.user_item}>
                <Button onClick={() => router.push('/Login')}>Login</Button>
                <Avatar size={48} icon={<UserOutlined />} />
            </div>)
                : (<div className={styles.user_item} >
                    <Button onClick={handleLogout}>Logout</Button>
                    <h3>{currentUser?.displayName}</h3>
                    <Avatar size={48} src={currentUser?.photoURL} />

                </div>)

            }






        </div>

    );
}

export default AppBar;