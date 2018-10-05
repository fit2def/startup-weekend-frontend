import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { USER_QUERY } from '../../queries';
import Nav from '../Nav';
import Landing from '../Landing';
import LoginOrCreate from '../LoginCreateAccount';
import NotFound from '../NotFound';

function LoggedIn() {
  return (
    <div className='App'>
      <Nav />
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route component={NotFound} />
      </Switch>)
    </div>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Query query={USER_QUERY}>
          {({ loading, error, data }) => (
            data.user
              ? LoggedIn() 
              : <LoginOrCreate />
          )}
        </Query>
      </BrowserRouter>
    );
  }
}

export default App;