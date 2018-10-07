import React from 'react';
import moneytime from './images/moneytime.jpeg';
import ladies from './images/ladies.jpeg';
import shop from './images/shop.jpeg';
import phone from './images/phone.jpeg';

export default function LandingContent() {
    return (
        <div className="container">

            <div className="text-center">
                <h2 className="featurette-heading">What is ReferMe?</h2>
                <p className="lead">ReferMe is a business referral system that allows you to connect companies you like to people you love AND get paid for it.</p>
            </div>

            <hr className="featurette-divider"></hr>

            <div className="row marketing text-center">
                <h2 className="featurette-heading"> Steps </h2>
                <div className="col-lg-3">
                    <img className="rounded-circle" src={phone} alt="stuff"></img>
                    <h3>Login or Create an Account</h3>
                    <p>It's free to sign up.</p>
                    <hr className="mb-4"></hr>
                </div>

                <div className="col-lg-3">
                    <img className="rounded-circle" src={shop} alt="stuff"></img>
                    <h3>Choose the business you'd like to refer.</h3>
                    <p>Find your business from among our partners.</p>
                    <hr className="mb-4"></hr>
                </div>


                <div className="col-lg-3">
                    <img className="rounded-circle" src={ladies} alt="stuff"></img>
                    <h3>Send the referral code</h3>
                    <p>Enter your friend's phone number and send the code via text. They get a discount, and you get paid for the referral. It's that easy.</p>
                    <hr className="mb-4"></hr>
                </div>

                <div className="col-lg-3">
                    <img className="rounded-circle" src={moneytime} alt="stuff" ></img>
                    <h3>Get paid!</h3>
                    <p>Redemption of rewards is easy. We'll get your rewards to you via Venmo or a pre-paid Visa giftcard.</p>
                    <hr className="mb-4"></hr>
                </div>


            </div>

        </div>
    );
}