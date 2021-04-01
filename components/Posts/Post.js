import React, {useEffect, useState} from 'react';
import {Avatar, Card} from 'antd';
import styles from './Posts.module.css'
import {CommentOutlined, DislikeFilled, DislikeOutlined, HeartFilled, HeartTwoTone} from '@ant-design/icons'
import {useRouter} from 'next/router';
import db, {firebaseAuth} from "../../config/firebaseConfig";
import {handleAction} from "../../common/handleAction";

const { Meta } = Card;

function Post(props) {
    const { post } = props;
    const [author, setAuthor] = useState(null);
    const currentuser = firebaseAuth.currentUser;

    const router = useRouter()
    useEffect(() => {
        const userRef = db.collection("users").doc(post.userid).onSnapshot(snap => {
            setAuthor(snap.data());
        })
    }, [])
    function handleClick(action) {
        if (!currentuser) {
            alert("You have to login");
        }
        handleAction(action, currentuser, post);
    }

    return (

        <Card className={styles.card}
            cover={
                <div className={styles.card_img} onClick={() => router.push({
                    pathname: '/Article',
                    query: { id: post.id },
                })}>
                    <img alt="example"
                        height={180} width={250} src={post.url} /></div>
            }
            actions={[
                <div onClick={() => handleClick("LIKE")}>

                    {currentuser && post?.like?.indexOf(currentuser.uid) > -1 ?
                        <HeartFilled style={{ color: "hotpink" }} />
                        : <HeartTwoTone twoToneColor="#eb2f96" />
                    }
                    <span style={{ fontSize: '12px', marginLeft: '2px' }}>{post?.like?.length}</span>
                </div>,

                <div onClick={() => handleClick("DISLIKE")}>
                    {currentuser && post?.dislike?.indexOf(currentuser.uid) > -1 ?
                        <DislikeFilled style={{ color: "hotpink" }} />
                        : <DislikeOutlined twoToneColor="#eb2f96" />
                    }
                    <span style={{ fontSize: '12px', marginLeft: '2px' }}>{post?.dislike?.length}</span>
                </div>,

                <CommentOutlined key="comment" />

            ]}

        >

            <Meta title={post.title}
                className={styles.card_body}
                avatar={<Avatar src={author?.photoURL} />}
                description={<div className={styles.card_content}>{post.content}</div>}
                onClick={() => router.push({
                    pathname: '/Article',
                    query: { id: post.id },
                })}
            />

        </Card>
    );
}

export default Post;