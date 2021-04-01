import React from 'react';
import {MessageBox} from 'react-chat-elements'


function MuiMessageBox(props) {
    return (
        <div>
            <MessageBox
                position={'left'}
                type={'photo'}
                text={'react.svg'}
                data={{
                    uri: 'https://pix10.agoda.net/hotelImages/5871009/-1/cc6a9504ad5eddf5c7e54f4f97b99922.jpg?s=1024x768',
                    status: {
                        click: false,
                        loading: 0,
                    }
                }} />

            <MessageBox
                reply={{
                    photoURL: 'https://pix10.agoda.net/hotelImages/5871009/-1/cc6a9504ad5eddf5c7e54f4f97b99922.jpg?s=1024x768',
                    title: 'elit magna',
                    titleColor: '#8717ae',
                    message: 'Aliqua amet incididunt id nostrud',
                }}
                onReplyMessageClick={() => console.log('reply clicked!')}
                position={'left'}
                type={'text'}
                text={'Tempor duis do voluptate enim duis velit veniam aute ullamco dolore duis irure.'} />

        </div>
    );
}

export default MuiMessageBox;