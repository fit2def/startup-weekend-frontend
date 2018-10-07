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

    clearState() {
        this.setState({
            referrerPhone: '',
            referreePhone: '',
            usedMessage: '',
            errorMessage: ''
        });
    }

    async submit(e, client) {
        e.preventDefault();

        this.clearState();

        console.log(this.state);

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
            usedMessage: `Referral code applied for ${data.useReferral.phone}.`
        });

    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <div>
                        <form onSubmit={(e) => this.submit(e, client)}>
                            <Phone onChange={(e) => this.setState({ referrerPhone: e.target.value })} />
                            <Phone onChange={(e) => this.setState({ referreePhone: e.target.value })} />
                            <button type="submit">Apply code</button>
                        </form>
                    </div>
                )
                }
            </ApolloConsumer>
        );
    }
}

export default Portal;