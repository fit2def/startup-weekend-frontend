import React from 'react';
import { withRouter } from 'react-router-dom';
import './Logout.css';

function Logout({ logout, history }) {
    return (
        <div>
            <button onClick={
                () => {
                    history.push('/');
                    logout()
                }}
            >LOGOUT</button>
        </div>
    )
}

export default withRouter(Logout);