import React from 'react';
import { withRouter } from 'react-router-dom';
import './Logout.css';

function Logout({ history }) {
    return (
        <div>
            <button onClick={
                () => {
                    history.push('/');
                    //
                }}
            >LOGOUT</button>
        </div>
    )
}

export default withRouter(Logout);