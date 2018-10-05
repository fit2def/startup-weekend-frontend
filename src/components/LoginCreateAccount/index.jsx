import React from 'react';
import Login from '../Login';
import CreateAccount from '../CreateAccount';
import './LoginCreateAccount.css';

export default function LoginCreateAccount() {
    return (
        <div className="LoginCreateAccount">
            <Login />
            <CreateAccount />
        </div>
    );
};