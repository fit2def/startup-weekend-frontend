import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import { AUTH_USER_MUTATION } from '../../queries';
import Password from '../Password';
import './Login.css';

const LOGIN_QUERY = gql`
  query loginQuery($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        username
      }
    }
  }
`;

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  async submit(e, client) {
    e.preventDefault();

    const { data } = await client.query({
      query: LOGIN_QUERY,
      variables: this.state
    });

    const { user } = data;

    user && client.query({
      query: AUTH_USER_MUTATION,
      variables: user
    });

    // otherwise fail and show some error messaging
  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className="Login">
            <p>Login</p>
            <form onSubmit={async e => await this.submit(e, client)}>
              <input required onChange={e => this.setState({ username: e.target.value})} />
              <Password onChange={e => this.setState({ password: e.target.value })}/>
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </ApolloConsumer >
    );
  }
}

export default Login;