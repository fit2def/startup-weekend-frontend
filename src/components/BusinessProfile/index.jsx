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
                    <div className="container">
                    <div className="row py-5">
                         <div className="col-md-6">
                           <div className="card mb-6 box-shadow">
                               <img className="card-img-top" alt="test" src="https://lh5.googleusercontent.com/p/AF1QipM-8aOKoeDGQqFVZK1KhaeO9-WH0Qfy0eJcVdAu=w213-h160-k-no" />
                             <div className="card-body">
                                 <h3>Guardian Pest Control</h3>
                                 <p className="card-text">Pest Control<br></br>Columbia</p>
                                 
                                         <h5 >Send to Friend</h5>
                         <hr className="mb-4"></hr>
                                
                                     <form onSubmit={(e) => this.submit(e, client)}>
                                     <div className="mb-3">
                           <label>Phone Number</label>
                          
                        <Phone onChange={e => this.setState({phone: e.target.value})} />
                        <div>{this.state.sentMessage}</div>
                        <div>{this.state.errorMessage}</div>
                        </div>
                        <button className="btn btn-primary btn-lg btn-block" type="submit">Refer Me</button>
                        </form>
                               
                               </div>
                             </div>
                           </div>
                         </div>
                    </div>
                )}
                
            </ApolloConsumer>
        );  
    }
}

export default BusinessProfile;