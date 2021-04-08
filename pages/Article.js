import React, {useEffect, useState} from 'react';
import styles from '../styles/Article.module.css'
import AppBar from '../components/AppBar';
import {Avatar, Button, Col, Image, Row, Tooltip} from 'antd';
import {useRouter} from 'next/router';
import db, {firebaseAuth} from '../config/firebaseConfig'
import {DislikeFilled, DislikeTwoTone, HeartFilled, HeartTwoTone, StarTwoTone} from '@ant-design/icons'
import Comments from '../components/Comments';
import {dateToYMD} from '../utils/dateToYMD';
import Loading from "../components/Loading";
import {handleAction} from "../common/handleAction";
import ReactMarkdown from "react-markdown";


const Article = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const user = firebaseAuth.currentUser;
    // console.log(id);
    const [data, setData] = useState({});
    const [author, setAuthor] = useState(null);
    const [rates, setRates] = useState([]);

    //get post by ID
    const docRef = db.collection("todos").doc(id);

    useEffect(() => {
        const sub = docRef.onSnapshot(snap => {
            const newdata = {
                id: snap.id,
                ...snap.data()
            }
            setData(newdata);
            console.log('get data done')
            getUserById(newdata.userid);  //id of author
        })


        return () => {
            if (sub) sub()
        }
    }, [id]);

    async function getUserById(id) {

        const userRef = db.collection("users").doc(id);
        try {
            const snapUser = await userRef.onSnapshot(snap => {
                setAuthor({ ...snap.data(), id: snap.id })
            })
            const snapRates = await userRef.collection('rates').onSnapshot(snap => {
                if (snap) {
                    setRates(snap.docs.map(snap => ({ ...snap.data(), id: snap.id })))
                }
            })
        } catch (e) {
            console.log(e);
        }

    }

    async function handleClick(action) {
        if (!user) {
            alert("you have to Login");
            return
        };
        handleAction(action, user, data);

    }

    async function onRate() {
        try {
            const userRef = db.collection("users").doc(author.id);

            const snapUser = await userRef.collection("rates").doc(user.uid)
            snapUser.get().then(doc => {
                if (doc.exists) {
                    snapUser.delete().then(() => {

                    })

                } else {
                    snapUser.set({
                        name: user.displayName,
                    })
                    console.log("success rate")

                }

            })
        } catch (e) {
            console.log(e);
        }

    }

    if (!data.content) return <Loading />
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
                            <Avatar size={64} src={author?.photoURL} onClick={() => router.push({
                                pathname: '/Profile',
                                query: { id: author.id },
                            })}
                                style={{ cursor: 'pointer' }} />
                            <h6 className={styles.article_subtitle}>{author?.displayName}</h6>
                            <div>
                                <span>{rates?.length}</span>
                                <StarTwoTone twoToneColor="#eb2f96" />

                            </div>
                            <Tooltip>
                                <span>{time}</span>
                            </Tooltip>
                            <Button onClick={() => onRate()}>Rate me</Button>
                        </div>
                    </div>
                </Col>
                <Col span={12}>
                    <div className={styles.article_content_wrap}>
                        <div className={styles.article_title}><ReactMarkdown source={data?.title}/></div>
                        <div className={styles.article_content}><ReactMarkdown source={data?.content}/></div>
                    </div>
                    <div className={styles.article_img}>
                        <Image src={data.url} width="100%"></Image>
                    </div>

                    <div className={styles.article_action}>
                        <div>
                            <Tooltip key="comment-basic-like" title="Like">
                                <Button onClick={() => handleClick('LIKE')}>
                                    {user && data?.like?.indexOf(user.uid) > -1 ?
                                        <HeartFilled style={{color: "hotpink"}}/>
                                        : <HeartTwoTone twoToneColor="#eb2f96" />
                                    }
                                    <span>{data?.like?.length}</span>
                                </Button>
                            </Tooltip>
                            <Tooltip key="comment-basic-dislike" title="Dislike">
                                <Button onClick={() => handleClick('DISLIKE')}>
                                    {user && data?.dislike?.indexOf(user.uid) > -1 ?
                                        <DislikeFilled style={{ color: "hotpink" }} />
                                        : <DislikeTwoTone twoToneColor="#eb2f96" />
                                    }
                                    <span>{data?.dislike?.length}</span>
                                </Button>
                            </Tooltip>

                        </div>
                        {user &&
                            (user.uid == author?.id) ? (<div className={styles.article_action_edit}
                            ><Button type="primary" onClick={() => router.push({
                                pathname: '/AddEdit',
                                query: { id: id },
                            })}>Edit</Button></div>) : (<div></div>)
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


