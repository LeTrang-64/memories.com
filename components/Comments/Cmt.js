import React, {useEffect, useState} from 'react';

import moment from "moment";
import {Avatar, Comment, Tooltip} from 'antd';
import {DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined} from '@ant-design/icons';
import getUser from "../../common/getUser";
import {handleActionCmt} from "../../common/handleAction";
import {firebaseAuth} from "../../config/firebaseConfig";


function Cmt(props) {
    const {comment,idArticle}=props;
    const time=comment?.timeSend?.toDate()||null;
    const idUser=comment.idUser;
    const [userCmt,setUserCmt]=useState()
    const currentuser=firebaseAuth.currentUser;

    useEffect(async ()=>{
        const sub= await getUser(idUser,setUserCmt);

        return ()=>{
            if(sub) sub();
        }

    },[idUser])


    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={()=>handleActionCmt("LIKE",currentuser,comment,idArticle)}>
                {currentuser&& comment?.like?.indexOf(currentuser.uid)>-1?
                    <LikeFilled  />
                    :<LikeOutlined />
                }
                <span style={{ fontSize: '12px', marginLeft: '2px' }}>{comment?.like?.length}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={()=>handleActionCmt("DISLIKE",currentuser,comment,idArticle)}>
                {currentuser&& comment?.dislike?.indexOf(currentuser.uid)>-1?
                    <DislikeFilled  />
                    :<DislikeOutlined />
                }
                <span style={{ fontSize: '12px', marginLeft: '2px' }}>{comment?.dislike?.length}</span>

            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];


    return (
        <div>
            <Comment
                actions={actions}
                author={<a>{userCmt?.displayName}</a>}
                avatar={
                    <Avatar
                      src={userCmt?.photoURL}
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