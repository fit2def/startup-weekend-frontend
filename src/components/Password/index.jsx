import React from 'react';

export default function Password({ mustMatch, onChange }) {
    return (
        <input
            onChange={onChange}
            type="password"
            required
            maxLength="16"
            pattern={ mustMatch || "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" }
            title={ mustMatch 
                ? "Passwords must match"
                : "Minimum eight characters, at least one letter and one number."
            }/>
    );
}