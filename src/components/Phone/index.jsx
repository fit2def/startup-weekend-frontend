import React from 'react';

export default function Phone(props) {
    return (
        <input
            className="form-control"
            required
            maxLength="10"
            pattern="[0-9]{10}"
            title="10 digits, no dashes or spaces."
            onChange={props.onChange} />
    )
};