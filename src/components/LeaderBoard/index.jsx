import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import NotFound from '../NotFound';
import './LeaderBoard.css';

const REFERRERS_QUERY = gql`
    {
        referrers {
            phone
            referrals {
                used
            }
        }
    }
`;

function showLeaderBoard(referrers) {
    return (
        <div className="LeaderBoard">
            <ul className="leaders">
                {referrers.map(r => (
                    <li>{r.phone}</li>
                ))}
            </ul>
        </div>
    );
}

export default function LeaderBoard(props){
    return (
        <Query query={REFERRERS_QUERY}>
            {({ error, loading, data}) => {
                if (error) return <NotFound />
                if (loading) return <p>Loading...</p>
                return showLeaderBoard(data.referrers);
            }}
        </Query>
    );
}