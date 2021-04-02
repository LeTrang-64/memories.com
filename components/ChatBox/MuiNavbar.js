import React from 'react';
import {Navbar} from 'react-chat-elements'
import {UserAddOutlined} from '@ant-design/icons'
import {Avatar, Button} from "antd";
import {useRouter} from "next/router";
import Loading from "../Loading";


function MuiNavbar(props) {
    const {otherUser} = props;
    const router = useRouter();

    if (!otherUser) return <Loading/>;
    return (
        <div>
            <Navbar
                left={
                    <div><Avatar size={36} src={otherUser.photoUrl} style={{cursor: 'pointer'}}
                                 onClick={() => router.push({
                                     pathname: '/Profile',
                                     query: {id: otherUser.id},
                                 })}/></div>
                }
                center={
                    <div>{otherUser.displayName}</div>
                }
                right={
                    <div>
                        <Button type={"none"}><UserAddOutlined/></Button>
                    </div>
                }/>

        </div>
    );
}

export default MuiNavbar;