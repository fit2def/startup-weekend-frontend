import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Phone from '../Phone';
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
        confirmPassword: '',
        errorMessage: ''
    }

    async submit(e, client) {
        e.preventDefault();
        const { data } = await client.mutate({
            mutation: CREATE_REFERRER_MUTATION,
            variables: this.state
        });

        const { createReferrer } = data;

        if (!createReferrer) {
            this.setState({ errorMessage: 'Failed to create account.'});
            return;
        }

        client.writeData({
            data: {
                authedReferrer: {
                    __typename: 'Referrer',
                    phone: createReferrer.phone
                }
            }
        });

    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <div className="CreateAccount">
                        <form onSubmit={async e => await this.submit(e, client)}>
                            <div className="mb-3">
                                <label>Phone</label>
                                <Phone onChange={e => this.setState({ phone: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>
                                <Password onChange={(e) => this.setState({ password: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label>Confirm password</label>
                                <Password
                                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                    mustMatch={this.state.password}
                                />
                            </div>

                            { this.state.errorMessage && <div className="alert alert-warning mt-3" role="alert">{this.state.errorMessage}</div>}

                            <button className="btn btn-primary btn-lg btn-block refer-green-bk" type="submit">Create an Account</button>
                        </form>
                    </div>
                )}
            </ApolloConsumer>
        );
    }
}

export default CreateAccount;