import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Password from '../Password';
import './Login.css';

const LOGIN_QUERY = gql`
  query login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      phone
    }
  }
`;

class Login extends Component {
  state = {
    phone: '',
    password: ''
  };

  async submit(e, client) {
    e.preventDefault();

    const { data } = await client.query({
      query: LOGIN_QUERY,
      variables: this.state
    });

    const { login } = data;

    login && client.writeData({
      data: {
        authedReferrer: {
          __typename: 'Referrer',
          phone: login.phone
        }
      }
    })

    //otherwise fail 

  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className="Login">
            <p>Login</p>
            <form onSubmit={async e => await this.submit(e, client)}>
              <input 
                required 
                pattern="[0-9]{10}" 
                title="10 digits, no dashes or spaces."
                onChange={e => this.setState({ phone: e.target.value})} />
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