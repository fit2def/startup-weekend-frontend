import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import Phone from '../Phone';
import gql from 'graphql-tag';

const USE_REFERRAL_MUTATION = gql`
    mutation useReferral($referrerPhone: String!, $referreePhone: String!) {
        useReferral(referrerPhone: $referrerPhone, referreePhone: $referreePhone) {
            referrerPhone
        }
    }
`;

class Portal extends Component {
    state = {
        referrerPhone: '',
        referreePhone: '',
        usedMessage: '',
        errorMessage: ''
    };

    async submit(e, client) {
        e.preventDefault();

        const { data } = await client.mutate({
            mutation: USE_REFERRAL_MUTATION,
            variables: {
                referrerPhone: this.state.referrerPhone,
                referreePhone: this.state.referreePhone
            }
        });


        if (!data.useReferral) {
            this.setState({
                errorMessage: 'Failed to apply usage of referral code.'
            });

            return;
        }

        this.setState({
            usedMessage: `Referral code applied for ${data.useReferral.referrerPhone}.`
        });
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                     <div className="album py-5">
                     <div className="container">
                         <h1 className="test-center">Business Portal</h1>
                        <form onSubmit={(e) => this.submit(e, client)}>
                            <div className="mb-3">
                                <label>Customer</label>
                                <Phone onChange={(e) => this.setState({ referreePhone: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label>Referrer</label>
                                <Phone onChange={(e) => this.setState({ referrerPhone: e.target.value })} />
                            </div>
                            <button type="submit">Apply code</button>
                            { this.state.sentMessage && <div className="alert alert-success mt-3" role="alert">{this.state.sentMessage}</div>}
                            { this.state.errorMessage && <div className="alert alert-warning mt-3" role="alert">{this.state.errorMessage}</div>}
                        </form>
                        </div>
                        </div>
                )
                }
            </ApolloConsumer>
        );
    }
}

export default Portal;