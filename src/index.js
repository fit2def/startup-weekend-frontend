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
    uri: 'http://localhost:4000/graphql',
    clientState: {
        defaults: {
            isConnected: true
        },
        resolvers: {
            Mutation: {
                updateNetworkStatus: (_, { isConnected }, { cache }) => {
                    cache.writeData({ data: { isConnected } });
                    return null;
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