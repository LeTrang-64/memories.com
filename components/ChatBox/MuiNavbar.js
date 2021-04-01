import React from 'react';
import {Navbar} from 'react-chat-elements'


function MuiNavbar(props) {
    return (
        <div>
            <Navbar
                top={
                    <div>'TOP' area</div>
                }
                center={
                    <div>'CENTER' area</div>
                }
                bottom={
                    <div>'BOTTOM' area</div>
                } />

        </div>
    );
}

export default MuiNavbar;