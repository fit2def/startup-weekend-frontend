import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Query } from 'react-apollo';
import { AUTHED_REFERRER_QUERY } from '../../queries';
import Nav from '../Nav';
import Landing from '../Landing';
import LoginOrCreate from '../LoginCreateAccount';
import BusinessProfile from '../BusinessProfile';
import Businesses from '../Businesses';
import LeaderBoard from '../LeaderBoard';
import NotFound from '../NotFound';

function LoggedIn() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/' component={Businesses} />
        <Route path='/business/:businessId' component={BusinessProfile} />
        <Route path='/leaderboard' component={LeaderBoard} />
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
              : <Landing />
          }}
        </Query>
      </BrowserRouter>
    );
  }
}

export default App;