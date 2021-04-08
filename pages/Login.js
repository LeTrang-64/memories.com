import React from 'react';
import {firebaseAuth} from '../config/firebaseConfig';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],

};

function Login(props) {
    return (
        <div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </div>
    );
}

export default Login;