import React from 'react';
import spinner from './spinner.gif';

export default function Loader() {
    return (
        <div>
            <img src={spinner} alt="spinner" />
        </div>
    );
};