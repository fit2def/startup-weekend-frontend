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
        <div className="album py-5">
            <div className="container">
                <h1 className="test-center">Leaderboard</h1>
                <table class="table table-bordered table-striped mt-4">
                    <thead>
                        <tr>
                        <th>Rank</th>
                        <th>User</th>
                        <th>Referrals</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        referrers.map(referrer => ({
                            phone: referrer.phone,
                            usedReferrals: referrer.referrals.reduce((acc, r) =>
                                r.used ? acc + 1 : acc, 0)
                        }))
                            .sort((r2, r1) => r1.usedReferrals - r2.usedReferrals)
                            .slice(0, 10)
                            .map((r, i) => (
                                <tr  key={`${i}`.repeat(6) + r.phone.substring(6)}>
                                     <td>{i + 1}</td>
                                    <td>******{r.phone.substring(6)}</td>
                                    <td>{r.usedReferrals}</td>
                                    </tr>
                            ))
                    }
                </tbody>
</table>
            </div>
        </div>
    );
}

export default function LeaderBoard(props) {
    return (
        <Query query={REFERRERS_QUERY} fetchPolicy="cache-and-network">
            {({ error, loading, data }) => {
                if (error) return <NotFound />
                if (loading) return <p>Loading...</p>
                return showLeaderBoard(data.referrers);
            }}
        </Query>
    );
}