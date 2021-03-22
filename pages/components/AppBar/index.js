import React from 'react';
import styles from '../AppBar/AppBar.module.css'

import Image from 'next/image'
import { Row, Col, Avatar } from 'antd';
import { useRouter } from 'next/router';

function AppBar(props) {
    const router = useRouter();
    return (

        <div className={styles.appbar}>
            <Row  >
                <Col span={4} >
                    <div className={styles.appbar_logo}>
                        <span onClick={() => router.push('/')}>ReView</span>
                    </div>


                </Col>
                <Col span={16} >
                    <div className={styles.appbar_title}>
                        <strong>MEMORIEs</strong>
                        <Image
                            src="/images/memories.png"
                            alt="Picture of the author"
                            width={60}
                            height={60}
                        />
                    </div>
                </Col>

                <Col span={4} >
                    <div className={styles.user_item}>
                        <h3>Thuy Trang</h3>
                        <Avatar size={32} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />

                    </div>
                </Col>


            </Row>

        </div>

    );
}

export default AppBar;