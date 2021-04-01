import React from 'react';
import {MessageList} from 'react-chat-elements'


function MuiMessageList(props) {
    return (
        <div>
            <MessageList
                className='message-list'
                lockable={true}
                toBottomHeight={'100%'}
                dataSource={[
                    {
                        position: 'right',
                        type: 'text',
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                        date: new Date(),
                    },

                ]} />

        </div>
    );
}

export default MuiMessageList;