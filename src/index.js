import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import './index.css';
import App from './components/App';

const cache = new InMemoryCache();

persistCache({
    cache,
    storage: window.localStorage
});

const client = new ApolloClient({
    cache,
    uri: 'http://10.204.35.23:4000/graphql',
    clientState: {
        defaults: {
            isConnected: true
        },
        resolvers: {
            Query: {
                authedReferrer: (_, __, { cache }) => {
                    return cache.data['authedReferrer'];
                }
            }
        }
    }
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);