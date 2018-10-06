import React, { Component } from 'react';
import Login from '../Login';
import CreateAccount from '../CreateAccount';
import './LoginCreateAccount.css';

class LoginCreateAccount extends Component {
    state = {
        selected: false
    };

    switchStates(e) {
        this.setState(prevState => ({
            selected: !prevState.selected
        }));
    }

    render() {
        return (
            <div className="LoginCreateAccount jumbotron">
            <div className="md-3 clearfix">
            <h4  className="float-left">{this.state.selected ? 'Create Account' : 'Sign In'}</h4>
            <button
                className="btn btn-link float-right" 
                onClick={(e) => this.switchStates(e)}>
            {this.state.selected ? 'Log In' : 'Create Account'}
            </button>
            </div>
            <hr className="mb-4"></hr>
            <div className="md-3">
            {
                this.state.selected 
                ? <CreateAccount />
                : <Login />
            }
            </div></div>
        );
    }
}

export default LoginCreateAccount;