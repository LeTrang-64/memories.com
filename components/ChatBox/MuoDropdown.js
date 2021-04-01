import React from 'react';
import {Dropdown} from 'react-chat-elements'


function MuoDropdown(props) {
    return (
        <div>
            <Dropdown
                buttonProps={{
                    text: 'Dropdown',
                }}
                items={[
                    'merhaba',
                    'lorem',
                    'ipsum',
                    'dolor',
                    'sit',
                    'amet',
                ]} />

        </div>
    );
}

export default MuoDropdown;