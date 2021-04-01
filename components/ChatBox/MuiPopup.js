import React from 'react';
import {Popup} from 'react-chat-elements'
import {useState} from 'react/cjs/react.development';


function MuiPopup(props) {
    const [state, setState] = useState(true)
    return (
        <div>
            <Popup
                show={state}
                header='Lorem ipsum dolor sit amet.'
                headerButtons={[{
                    type: 'transparent',
                    color: 'black',
                    text: 'close',
                    onClick: () => {
                        setState({ show: false })
                    }
                }]}
                text='Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem animi veniam voluptas eius!'
                footerButtons={[{
                    color: 'white',
                    backgroundColor: '#ff5e3e',
                    text: "Vazgeç",
                }, {
                    color: 'white',
                    backgroundColor: 'lightgreen',
                    text: "Tamam",
                }]} />

        </div>
    );
}

export default MuiPopup;