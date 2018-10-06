import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { AUTHED_REFERRER_QUERY } from '../../queries';
import Nav from '../Nav';
import Landing from '../Landing';
import LoginOrCreate from '../LoginCreateAccount';
import NotFound from '../NotFound';

function LoggedIn() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route component={NotFound} />
      </Switch>
      <Nav />
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Query query={AUTHED_REFERRER_QUERY}>
          {({ loading, error, data }) => {
            if (error) return <NotFound />
            if (loading) return <p>Loading...</p>
            
            return data.authedReferrer
              ? LoggedIn() 
              : <LoginOrCreate />
          }}
        </Query>
      </BrowserRouter>
    );
  }
}

export default App;