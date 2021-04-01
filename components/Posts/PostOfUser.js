import React from 'react';
import styles from './Posts.module.css'
import {CommentOutlined, DislikeFilled, DislikeOutlined, HeartFilled, HeartTwoTone} from '@ant-design/icons';
import {Avatar, Card, Tooltip} from 'antd';
import Loading from "../Loading";
import {firebaseAuth} from "../../config/firebaseConfig";
import {handleAction} from "../../common/handleAction";
import {dateToYMD} from "../../utils/dateToYMD";
import moment from "moment";
import {useRouter} from 'next/router';

const { Meta } = Card;





function PostOfUser(props) {
    const { datas, user } = props;
    const router = useRouter();
    const currentuser = firebaseAuth.currentUser;
    if (!datas) return <Loading />

    function handleClick(action, data) {
        if (!currentuser) {
            alert("You have to login");
        }
        handleAction(action, currentuser, data);
    }
    console.log(datas)
    return datas.map((data, index) =>
    (
        <div className={styles.card_post} key={index}>
            <Card className={styles.card_post_user}
                style={{ width: '100%', marginTop: 16 }}
                actions={[
                    <div onClick={() => handleClick("LIKE", data)}>

                        {currentuser && data?.like?.indexOf(currentuser.uid) > -1 ?
                            <HeartFilled style={{ color: "hotpink" }} />
                            : <HeartTwoTone twoToneColor="#eb2f96" />
                        }

                        <span style={{ fontSize: '12px', marginLeft: '2px' }}>{data?.like?.length}</span>
                    </div>,

                    <div onClick={() => handleClick("DISLIKE", data)}>

                        {currentuser && data?.dislike?.indexOf(currentuser.uid) > -1 ?
                            <DislikeFilled style={{ color: "hotpink" }} />
                            : <DislikeOutlined twoToneColor="#eb2f96" />
                        }
                        <span style={{ fontSize: '12px', marginLeft: '2px' }}>{data?.dislike?.length}</span>
                    </div>,

                    <CommentOutlined key="comment" />

                ]}
            >

                <div className={styles.card_content_box}>
                    <Meta
                        avatar={
                            <Avatar src={user.photoURL} />
                        }
                        title={
                            <div className={styles.card_title}>
                                <span
                                    onClick={() => router.push({
                                        pathname: '/Article',
                                        query: { id: data.id },
                                    })}
                                >{data.title}</span>
                                <Tooltip title={moment(data.startedAt.toDate()).format('YYYY-MM-DD HH:mm:ss')}>
                                    <span className={styles.card_title_time}>{dateToYMD(data.startedAt.toDate())}</span>
                                </Tooltip>
                            </div>
                        }
                        description={
                            <div className={styles.user_post_content}>
                                <div>{data.content}</div>
                            </div>
                        }
                    />
                    <span className={styles.card_photo}><img src={data.url} ></img></span>
                </div>
            </Card>


        </div>
    ))
}

export default PostOfUser;