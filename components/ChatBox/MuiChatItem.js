import React from 'react';
import {ChatItem} from 'react-chat-elements'


function MuiChatItem(props) {
    return (
        <div>
            <ChatItem
                avatar={'https://pix10.agoda.net/hotelImages/5871009/-1/cc6a9504ad5eddf5c7e54f4f97b99922.jpg?s=1024x768'}
                alt={'Reactjs'}
                title={'Facebook'}
                subtitle={'What are you doing?'}
                date={new Date()}
                unread={0} />

        </div>
    );
}

export default MuiChatItem;