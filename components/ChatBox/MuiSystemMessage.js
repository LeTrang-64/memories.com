import React from 'react';
import {SystemMessage} from 'react-chat-elements'

function MuiSystemMessage(props) {
    return (
        <div>
            <SystemMessage
                text={'End of conversation'} />

        </div>
    );
}

export default MuiSystemMessage;