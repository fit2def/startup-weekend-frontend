import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { ApolloConsumer } from 'react-apollo';
import './Logout.css';

const LOGOUT_MUTATION = gql`
    mutation logoutMutation{
        logout @client
    }
`

class Logout extends Component {
    async logout(client) {
        await client.mutate({
            mutation: LOGOUT_MUTATION
        })
        await client.reFetchObservableQueries();
        this.props.history.push('/');
    }

    render() {
        return (
            <ApolloConsumer>
                {client => (
                    <button onClick={async e => await this.logout(client)}>
                        LOGOUT
                    </button>
                )}
            </ApolloConsumer>
        )
    }
}


export default withRouter(Logout);