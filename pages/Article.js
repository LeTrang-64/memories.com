import React, { useEffect, useState } from 'react';
import styles from '../styles/Article.module.css'
import AppBar from './components/AppBar';
import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import db from '../config/firebaseConfig'
import { Row, Col } from 'antd';
import { HeartTwoTone, CommentOutlined, DislikeOutlined } from '@ant-design/icons'

import { Button, Image, Tooltip } from 'antd';
import Comments from './components/Comments';
import { dateToYMD } from './utils/dateToYMD';




const Article = (props) => {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    const [data, setData] = useState({});

    //get post by ID
    const docRef = db.collection("Todos").doc(id);


    useEffect(() => {

        const sub = docRef.onSnapshot(snap => {

            setData(snap.data())
            console.log('get data done')
        })

        return () => {
            if (sub) sub()
        }
    }, [id])


    function handleClick(action) {
        switch (action) {
            case "LIKE":
                {
                    docRef.update({
                        like: data.like + 1,
                    })

                }

                break;
            case "DISLIKE":
                {
                    docRef.update({
                        dislike: data.dislike + 1,
                    })

                }

                break;

            default:
                break;
        }

    }
    if (!data.content) return 'Loading...'

    const time = dateToYMD(data.startedAt.toDate()); // Nov 5;

    return (
        <div className={styles.article}>
            <AppBar />

            <Row justify="center" align="top">
                <Col span={3}>

                </Col>
                <Col span={3}>
                    <div className={styles.article_author}>
                        <div className={styles.article_author_wrap}>
                            <h6>BAI VIET BOI</h6>
                            <Avatar size={64} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <h6 className={styles.article_subtitle}>Thuy Trang</h6>
                            <Tooltip >
                                <span>{time}</span>
                            </Tooltip>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.article_title}><h1>{data.title}</h1></div>

                    <div className={styles.article_content}>{data.content}</div>
                    <div className={styles.article_img}>
                        <Image src={data.url} width={951} ></Image>


                    </div>
                    <div className={styles.article_action}>
                        <div>
                            <Button onClick={() => handleClick('LIKE')}><HeartTwoTone twoToneColor="#eb2f96" />
                                <span>{data.like}</span></Button>
                            <Button onClick={() => handleClick('DISLIKE')}><DislikeOutlined key="dislike" /> <span>{data.dislike}</span></Button>
                            <Button><CommentOutlined key="comments" /></Button>
                        </div>
                        <div className={styles.article_action_edit}
                        ><Button type="primary" onClick={() => router.push({
                            pathname: '/AddEdit',
                            query: { id: id },
                        })}>Edit</Button></div>

                    </div>
                    <div className={styles.article_comments}>
                        <Comments />
                    </div>

                </Col>

                <Col span={3}>

                </Col>
                <Col span={3}>

                </Col>
            </Row>



        </div >
    );
}



export default Article;


