import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Phone from '../Phone';
import { AUTHED_REFERRER_QUERY } from '../../queries';
import apexfam from './apexfam.jpg';
import './BusinessProfile.css';

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
            name: 'APEX Window Cleaning',
            address: 'Ste. D PMB #123, 3305 East Clark Ln, Columbia, MO 65202',
            phone: '573-356-5786'
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
                message: `${this.state.phone}: Your ReferMe code for ${this.state.business.name} is ${authedReferrer.phone}`
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
                    <div className="container profile">
                     <div className="row py-5">
                     <div className="col-md-6">
                       <div className="card mb-6 box-shadow">
                           <img className="card-img-top" alt="test" src={apexfam} />
                         <div className="card-body">
                             <h3>APEX Window Cleaning</h3>
                             <p className="card-text"><i class="fas fa-map-marker-alt"></i><b>Address</b></p>
                             <p className="card-text">{this.state.business.address}</p>
                             <p className="card-text"><i class="fas fa-phone"></i> <b>Phone</b></p>
                             <p className="card-text"> {this.state.business.phone}</p>
                             
                                     <h5 className="send-header">Send to Friend</h5>
                     <hr className="mb-4"></hr>
                            
                                 <form onSubmit={(e) => this.submit(e, client)}>
                                 <div className="mb-3">
                       <label>Phone Number</label>
                      
                    <Phone onChange={e => this.setState({phone: e.target.value})} />
                    { this.state.sentMessage && <div className="alert alert-success mt-3" role="alert">{this.state.sentMessage}</div>}
                    { this.state.errorMessage && <div className="alert alert-warning mt-3" role="alert">{this.state.errorMessage}</div>}
                    
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