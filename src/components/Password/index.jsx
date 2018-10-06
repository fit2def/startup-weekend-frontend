import React from 'react';

export default function Password({ mustMatch, onChange }) {
    return (
        <input
            onChange={onChange}
            type="password"
            required
            maxLength="16"
            pattern={ mustMatch || "^[A-Za-z0-9-_!]{8,16}$" }
            title={ mustMatch 
                ? "Passwords must match"
                : "Eight to 16 characters"
            }/>
    );
}