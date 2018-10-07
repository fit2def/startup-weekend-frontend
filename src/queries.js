import { gql } from 'apollo-boost';

const AUTHED_REFERRER_QUERY = 
gql`
    query getAuthedReferrer {
        authedReferrer @client {
            phone
        }
    }
`;

const CREATE_REFERRER_MUTATION = gql`
    mutation($phone: String!, $password: String!) {
        createReferrer(phone: $phone, password: $password ) {
            phone
        }
    }
`;

export {
    AUTHED_REFERRER_QUERY,
    CREATE_REFERRER_MUTATION
};