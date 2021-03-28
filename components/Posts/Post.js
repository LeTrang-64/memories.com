import React from 'react';
import { Card, Avatar } from 'antd';
import styles from './Posts.module.css'
import {HeartTwoTone, CommentOutlined, DislikeOutlined, DislikeFilled,HeartFilled} from '@ant-design/icons'
import { useRouter } from 'next/router';
import {useEffect,useState} from "react";
import db, {firebaseAuth} from "../../config/firebaseConfig";
const { Meta } = Card;

function Post(props) {
    const { post } = props;
    const [author,setAuthor]=useState(null);
    const currentuser=firebaseAuth.currentUser;

    const router = useRouter()
    useEffect(()=>{
        const userRef=db.collection("users").doc(post.userid).onSnapshot(snap=>{
            setAuthor(snap.data());
        })
    },[])


    return (

        <Card className={styles.card}
            cover={<div className={styles.card_img}><img alt="example"
                             height={180} width={250} src={post.url} /></div>}
            actions={[
                <div>
                    {currentuser&& post?.like?.indexOf(currentuser.uid)>-1?
                    <HeartFilled  style={{color: "hotpink"}}/>
                    :<HeartTwoTone twoToneColor="#eb2f96" />
                }
                    <span style={{ fontSize: '12px', marginLeft: '2px' }}>{post?.like?.length}</span></div>,
                <div> {currentuser&& post?.dislike?.indexOf(currentuser.uid)>-1?
                    <DislikeFilled  style={{color: "hotpink"}}/>
                    :<DislikeOutlined twoToneColor="#eb2f96" />
                }
                    <span style={{ fontSize: '12px', marginLeft: '2px' }}>{post?.dislike?.length}</span></div>,
                <CommentOutlined key="comment" />

            ]}
        >

            <Meta title={post.title}
                avatar={<Avatar src={author?.photoURL} />}
                description={<div className={styles.card_content}>{post.content}</div>} className={styles.card_body}
                onClick={() => router.push({
                    pathname: '/Article',
                    query: { id: post.id },
                })} />

        </Card>
    );
}

export default Post;