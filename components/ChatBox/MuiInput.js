import React, {useRef} from 'react';
import {Button, Input} from 'react-chat-elements'
import db, {Timestamp} from '../../config/firebaseConfig'


function MuiInput(props) {
    const {currentUser, activeChatId} = props;
    const inputRef = useRef("");

    function handleclick() {
        const value = inputRef.current.input.value;
        if (value.length > 0) {
            const newMsg = {
                type: 'text',
                text: value,
            }
            sendMessage(newMsg, currentUser);

        }

        console.log(value);


    }
    function sendMessage(msg, user) {
        if (!user) return;

        const chatRef = db.collection("chatroom").doc(activeChatId);
        const time = Timestamp.now();
        chatRef.collection("messages").doc().set({
            userid: user.uid,
            ...msg,
            startedAt: time
        })
            .then(() => {
                console.log("Document successfully send!");
                inputRef.current.input.value = ""; //clear
            })
            .catch((error) => {
                console.error("Error send document: ", error);
            });

        // -----update time--------
        chatRef.update({
            startedAt: time,
        }).then(() => {
            console.log("Document successfully updated!");
        })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

    }

    function handleKeyDown(e) {
        if (e.keyCode === 13) {
            handleclick();
        }

    }

    return (
        <div>
            <Input
                placeholder="Type here..."
                multiline={true}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                autoHeight={false}
                rightButtons={
                    <Button
                        color='white'
                        backgroundColor='black'
                        text='Send' onClick={handleclick}/>
                }/>
        </div>
    );
}

export default MuiInput;