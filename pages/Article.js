import React, {createElement, useEffect, useState} from 'react';
import styles from '../styles/Article.module.css'
import AppBar from '../components/AppBar';
import { Avatar } from 'antd';
import { useRouter } from 'next/router';
import db, { firebaseAuth } from '../config/firebaseConfig'
import { Row, Col } from 'antd';
import {HeartTwoTone, CommentOutlined, DislikeOutlined, StarTwoTone, LikeFilled, LikeOutlined} from '@ant-design/icons'

import { Button, Image, Tooltip } from 'antd';
import Comments from '../components/Comments';
import { dateToYMD } from '../utils/dateToYMD';




const Article = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const user = firebaseAuth.currentUser;
    // console.log(id);
    const [data, setData] = useState({});
    const [author, setAuthor] = useState(null);
    const [rates, setRates] = useState([]);
    const [likes,setLikes]=useState([]);
    const [disLikes,setDislikes]=useState([]);
    const [comments,setComments]=useState([]);

    //get post by ID
    const docRef = db.collection("Todos").doc(id);



    useEffect(() => {
        const sub = docRef.onSnapshot(snap => {
            const newdata = snap.data();
            setData(newdata);
            console.log('get data done')
            getAuthorById(newdata.userid);  //id of author
        })
        const snapLikes = docRef.collection('likes').onSnapshot(snap => {
            if (snap) {
                setLikes(snap.docs.map(snap => ({ ...snap.data(), id: snap.id })));
            }
           }
        )
        const snapDislikes = docRef.collection('dislikes').onSnapshot(snap => {
                console.log(snap);
                if (snap) {
                    setDislikes(snap.docs.map(snap => ({...snap.data(), id: snap.id})));
                }
            }
        )

        return () => {
            if (sub) sub()
            if(snapLikes()) snapLikes();
            if(snapDislikes()) snapDislikes();
        }
    }, [id]);


    async function getAuthorById(id) {

        const userRef = db.collection("users").doc(id);
        try {
            const snapUser = await userRef.onSnapshot(snap => {
                setAuthor({ ...snap.data(), id: snap.id })
            })
            const snapRates = await userRef.collection('rates').onSnapshot(snap => {

                if (snap) {
                    setRates(snap.docs.map(snap => ({ ...snap.data(), id: snap.id })))
                }

            }
            )
        } catch (e) {
            console.log(e);
        }

    }

    async function handleClick(action) {
        if(!user) {
            alert("you have to Login");
            return
        };
        switch (action) {
            case "LIKE":
                {
                    try {
                        const snapLike = await docRef.collection("likes").doc(user.uid);
                        snapLike.get().then((doc)=>{
                            if(doc.exists){
                                console.log('you liked before')
                                snapLike.delete().then(()=>{
                                    //do something
                                })
                            }else{
                                snapLike.set({
                                            name: user.displayName,
                                        });
                                console.log("success like")
                            }
                        })

                    } catch (e) {
                        console.log(e);
                    }
                }
                break;
            case "DISLIKE":
                {
                    try {
                        const snapDislike = await docRef.collection("dislikes").doc(user.uid);
                        snapDislike.get().then((doc)=>{
                            if(doc.exists){
                                console.log('you disliked before')
                                snapDislike.delete().then(()=>{
                                    //do something
                                })
                            }else{
                                snapDislike.set({
                                    name: user.displayName,
                                });
                                console.log("success dislike")

                            }
                        })


                    } catch (e) {
                        console.log(e);
                    }
                }
                break;

            default:
                break;
        }

    }

    async function onRate() {
        try {
            const userRef = db.collection("users").doc(author.id);

            const snapUser = await userRef.collection("rates").doc(user.uid).set({
                name: user.displayName,
            });

        } catch (e) {
            console.log(e);
        }

    }
    if (!data.content) return 'Loading...'

    const time = dateToYMD(data.startedAt.toDate()); // Nov 5;

    return (
        <div className={styles.article}>
            <AppBar currentUser={user} />

            <Row justify="center" align="top">
                <Col span={3}>

                </Col>
                <Col span={3}>
                    <div className={styles.article_author}>
                        <div className={styles.article_author_wrap}>
                            <h6>BAI VIET BOI</h6>
                            <Avatar size={64} src={author?.photoURL} />
                            <h6 className={styles.article_subtitle}>{author?.displayName}</h6>
                            <div>
                                <span>{rates?.length}</span>
                                <StarTwoTone twoToneColor="#eb2f96" />

                            </div>
                            <Tooltip >
                                <span>{time}</span>
                            </Tooltip>
                            <Button onClick={() => onRate()} >Rate me</Button>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.article_title}><h1>{data?.title}</h1></div>
                    <div className={styles.article_content}>{data?.content}</div>
                    <div className={styles.article_img}>
                        <Image src={data.url} width="100%"></Image>
                    </div>

                    <div className={styles.article_action}>
                        <div>
                            <Tooltip key="comment-basic-like" title="Like">
                                <Button onClick={() => handleClick('LIKE')}>
                                    <HeartTwoTone twoToneColor="#eb2f96" />
                                    <span>{likes?.length}</span>
                                </Button>
                            </Tooltip>
                            <Tooltip key="comment-basic-dislike" title="Dislike">
                                <Button onClick={() => handleClick('DISLIKE')}>
                                      <DislikeOutlined key="dislike" />
                                    <span>{disLikes?.length}</span>
                                </Button>
                            </Tooltip>
                            <Button>
                                <CommentOutlined key="comments" />
                            </Button>
                        </div>
                        {user&&
                            (user.uid==author?.id)?(<div className={styles.article_action_edit}
                            ><Button type="primary" onClick={() => router.push({
                                pathname: '/AddEdit',
                                query: { id: id },
                            })}>Edit</Button></div>):(<div></div>)
                        }


                    </div>
                    <div className={styles.article_comments}>
                        <Comments idArticle={id} />
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


