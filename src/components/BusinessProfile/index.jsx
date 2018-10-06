import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Phone from '../Phone';
import { AUTHED_REFERRER_QUERY } from '../../queries';

const CREATE_REFERRAL_MUTATION = gql`
    mutation createReferral($referrerPhone: String!, $referreePhone: String!, $message: String!) {
        createReferral(referrerPhone: $referrerPhone, referreePhone: $referreePhone, message: $message) {
            referreePhone
        }
    }
`;


class BusinessProfile extends Component {
    state = {
        phone: '',
        sentMessage: '',
        errorMessage: '',
        business: {
            name: 'Guardian Pest Control',
            address: ''
        }
    };

    async submit(e, client) {
        e.preventDefault();

        const { data } = await client.query({
            query: AUTHED_REFERRER_QUERY
        });

        const { authedReferrer } = data;

        const dataResult = await client.mutate({
            mutation: CREATE_REFERRAL_MUTATION,
            variables: {
                referrerPhone: authedReferrer.phone,
                referreePhone: this.state.phone,
                message: 'Stock text'
            }
        })

        const { createReferral } = dataResult.data;

        if (!createReferral) {
            this.setState({
                errorMessage: "No repeats, and you can't refer yourself!"
            });
            return;
        }


        this.setState({
            sentMessage: `Success! You've referred ${this.state.business.name} to ${createReferral.referreePhone}`
        })

    }

    render(){
        return (
            <ApolloConsumer>
                {client => (
                    <div className="BusinessProfile" >
                        <form onSubmit={(e) => this.submit(e, client)}>
                            enter ur frand's phone fam
                        <Phone onChange={e => this.setState({phone: e.target.value})} />
                        <div>{this.state.sentMessage}</div>
                        <div>{this.state.errorMessage}</div>
                        <button type="submit">send code</button>
                        </form>
                    </div>
                )}
                
            </ApolloConsumer>
        );  
    }
}

export default BusinessProfile;