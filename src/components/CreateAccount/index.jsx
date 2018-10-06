import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Password from '../Password';
import './CreateAccount.css';

const CREATE_REFERRER_MUTATION = gql`
    mutation createReferrerMutation($phone: String!, $password: String!) {
        createReferrer(phone: $phone, password: $password) {
            phone
        }
    }
`;

class CreateAccount extends Component {
    state = {
        phone: '',
        password: '',
        confirmPassword: ''
    }

    async submit(e, client) {
        e.preventDefault();
        const { data } = await client.mutate({
            mutation: CREATE_REFERRER_MUTATION,
            variables: this.state
        });

        const { createReferrer } = data;

        createReferrer && client.writeData({
            data: {
                authedReferrer: {
                  __typename: 'Referrer',
                  phone: createReferrer.phone
                }
              }
        });

        // otherwise fail and show some error message

    }
    
    render() {
        return (
            <ApolloConsumer>
            {client => (
                <div className="CreateAccount">
                <p>Create Account</p>
                    <form onSubmit={async e => await this.submit(e, client)}>
                        Phone#
                        <input 
                            onChange={(e) => this.setState({phone: e.target.value})}
                            required 
                            pattern="^[0-9]{10}$"
                            title="10 digit phone number, no spaces or dashes."/>
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