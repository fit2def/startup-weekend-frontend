import React from 'react';
import './Landing.css';
import LoginCreateAccount from '../LoginCreateAccount';
import LandingContent from '../LandingContent';

export default function Landing() {
    return (
        <div className="Landing">
            <LoginCreateAccount />
            <LandingContent />
        </div>
    );
};