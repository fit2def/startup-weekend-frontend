import { gql } from 'apollo-boost';

const USER_QUERY = gql`
    query getUser {
        user @client {
            id
            username 
        }
    }
`;

const AUTH_USER_MUTATION = gql`
    mutation authUserMutation($username: String!, $id: ID!) {
        authUser(username: $username, id: $id) @client
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation($username: String!, $password: String!) {
        createUser(username: $username, password: $password ) {
            id
            username
        }
    }
`;

export {
    USER_QUERY,
    AUTH_USER_MUTATION,
    CREATE_USER_MUTATION
};