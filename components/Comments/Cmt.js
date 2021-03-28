import React, {createElement, useState,useEffect} from 'react';

import moment from "moment";
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, FilterOutlined } from '@ant-design/icons';
import getUser from "../../common/getUser";
import {dateToYMD} from "../../utils/dateToYMD";



function Cmt(props) {
    const {comment}=props;

    const time=comment?.timeSend?.toDate()||null;


// const date=new Date(time.toMillis()*1000);

    const idUser=comment.idUser;
    const [user,setUser]=useState()
    useEffect(async ()=>{
        const sub= await getUser(idUser,setUser);

    },[idUser])


    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];


    return (
        <div>
            <Comment
                actions={actions}
                author={<a>{user?.displayName}</a>}
                avatar={
                    <Avatar
                      src={user?.photoURL}
                      alt="L"
                    />
                }
                content={
                    <p>
                        {comment.cmtLine}
                    </p>
                }
                datetime={
                    <Tooltip title={moment(time).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(time).fromNow(true)}</span>
                    </Tooltip>
                }
            />
        </div>

    );
}

export default Cmt;