import React, { useState } from "react";

import { getAuth, EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { StyledFirebaseAuth } from "react-firebaseui";

export default function LogInPage(props) {
    const auth = getAuth();
    const loginCallback = props.loginCallback;

    const configObj = {
        signInOptions: [
            { 
                provider: EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: true,
            },
            {
                provider: GoogleAuthProvider.PROVIDER_ID
            }
        ],
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: () => false
        },
        credentialHelper: 'none'
    }

    return (
        <div>
                <StyledFirebaseAuth firebaseAuth={auth} uiConfig={configObj} />
        </div>
    )
}