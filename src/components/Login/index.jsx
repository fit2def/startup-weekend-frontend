import React, { Component } from 'react';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import Password from '../Password';
import './Login.css';
import Phone from '../Phone';

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
    password: '',
    errorMessage: ''
  };

  async submit(e, client) {
    e.preventDefault();

    const { data } = await client.query({
      query: LOGIN_QUERY,
      variables: this.state
    });

    const { login } = data;

    if (!login) {
      this.setState({
        errorMessage: 'Failed to sign in.'
      })
      return;
    }

    client.writeData({
      data: {
        authedReferrer: {
          __typename: 'Referrer',
          phone: login.phone
        }
      }
    })

  }

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div className="Login">
            <form onSubmit={async e => await this.submit(e, client)}>
              <div className="mb-3">
                <label>Phone</label>
                <Phone onChange={e => this.setState({ phone: e.target.value })} />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Password onChange={e => this.setState({ password: e.target.value })} />
              </div>
              { this.state.errorMessage && <div className="alert alert-warning mt-3" role="alert">{this.state.errorMessage}</div>}
              <button className="btn btn-primary btn-lg btn-block refer-green-bk" type="submit">Sign In</button>
            </form>
          </div>
        )}
      </ApolloConsumer >
    );
  }
}

export default Login;