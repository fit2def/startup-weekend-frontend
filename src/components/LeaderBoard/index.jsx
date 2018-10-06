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
                {
                    referrers.map(referrer => ({
                        phone: referrer.phone,
                        usedReferrals: referrer.referrals.reduce((acc, r) =>
                            r.used ? acc + 1 : acc, 0)
                    }))
                    .sort((r2, r1) => r1.usedReferrals - r2.usedReferrals)
                    .map((r, i) => (
                        <li key={`${i}`.repeat(6) + r.phone.substring(6)}>
                            <div>******{r.phone.substring(6)}</div>
                            <div>{r.usedReferrals}</div>
                        </li>
                    ))
                }
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