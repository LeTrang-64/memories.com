import React, {useEffect, useRef, useState} from 'react';
import {Button, Input} from 'react-chat-elements'
import db, {Timestamp} from '../../config/firebaseConfig'
import getUser from "../../common/getUser"


function MuiInput(props) {
    const { currentUser, activeChat } = props;

    const inputRef = useRef(null);

    const [user, setUser] = useState();
    useEffect(() => {


        const sub = getUser(currentUser.uid, setUser);
        console.log(user)

        return () => {
            if (sub) sub()
        }

    }, [])



    function handleclick() {
        const value = inputRef.current.input.value;
        if (value.length > 0) {
            const newMsg = {
                type: 'text',
                text: value,
            }
            console.log(user);
            sendMessage(newMsg, user);
        }

        console.log(value);


    }
    function sendMessage(msg, user) {
        if (!user) return;
        console.log(activeChat);

        const chatRef = db.collection("chatroom").doc(activeChat.id);
        const time = Timestamp.now();
        chatRef.collection("messages").doc().set({
            userid: user.uid,
            ...msg,
            startedAt: time
        })
            .then(() => {
                console.log("Document successfully send!");

            })
            .catch((error) => {
                console.error("Error send document: ", error);
            });


    }

    return (
        <div>
            <Input
                placeholder="Type here..."
                multiline={true}
                ref={inputRef}
                rightButtons={
                    <Button
                        color='white'
                        backgroundColor='black'
                        text='Send' onClick={handleclick} />
                } />

        </div>
    );
}

export default MuiInput;