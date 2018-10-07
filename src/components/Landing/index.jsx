import React from 'react';
import LoginCreateAccount from '../LoginCreateAccount';
import LandingContent from '../LandingContent';
import './Landing.css';

export default function Landing() {
    return (
        <div className="Landing">
            <LoginCreateAccount />
            <LandingContent />
        </div>
    );
};