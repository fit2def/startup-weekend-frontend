import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_USER_MUTATION } from '../../queries';
import Password from '../Password';
import './CreateAccount.css';

const CREATE_USER_MUTATION = gql`
    mutation($username: String!, $password: String!) {
        createUser(username: $username, password: $password ) {
            id
            username
        }
    }
`;

class CreateAccount extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: ''
    }

    async submit(e, client) {
        e.preventDefault();
        const { data } = await client.query({
            query: CREATE_USER_MUTATION,
            variables: this.state
        });

        const { user } = data;

        user && client.query({
            query: AUTH_USER_MUTATION,
            variables: user
        })

        // otherwise fail and show some error message

    }
    
    render() {
        return (
            <ApolloConsumer>
            {client => (
                <div className="CreateAccount">
                <p>Create an Account</p>
                    <form onSubmit={async e => await this.submit(e, client)}>
                        username
                        <input 
                            onChange={(e) => this.setState({username: e.target.value})}
                            required 
                            pattern="[A-Za-z\d]{5,16}"
                            title="5 to 16 alphanumeric characters, no spaces"/>
                        <label>Password</label>
                        <Password onChange={(e) => this.setState({ password: e.target.value })}/>
                        <label>Confirm password</label>
                        <Password 
                            onChange={(e) => this.setState({ confirmPassword: e.target.value })} 
                            mustMatch={this.state.password}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
            </ApolloConsumer>
        );
    }
}

export default CreateAccount;