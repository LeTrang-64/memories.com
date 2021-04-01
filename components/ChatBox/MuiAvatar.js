import React from 'react';
import {Avatar} from 'react-chat-elements'


function MuiAvatar(props) {
    return (
        <div>
            <Avatar
                src={'https://facebook.github.io/react/img/logo.svg'}
                alt={'logo'}
                size="large"
                type="circle flexible" />

        </div>
    );
}

export default MuiAvatar;