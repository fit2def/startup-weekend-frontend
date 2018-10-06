import React from 'react';
import moneytime from './images/moneytime.jpeg';
import ladies from './images/ladies.jpeg';
import shop from './images/shop.jpeg';
import phone from './images/phone.jpeg';

export default function LandingContent() {
    return (
        <div className="container marketing">

            <div className="text-center">
                <h2 className="featurette-heading">What is ReferMe?</h2>
                <p className="lead">ReferMe is a business referral system that allows you to connect companies you like to people you love AND get paid for it.</p>
            </div>

            <hr className="featurette-divider"></hr>

            <div className="row marketing">
                <h2> Steps </h2>
                <div className="col-lg-3">
                    <img className="rounded-circle" src={phone} alt="stuff"></img>
                    <h2>Login or Create an Account</h2>
                    <p>It's free to sign up.</p>
                </div>

                <div className="col-lg-3">
                    <img className="rounded-circle" src={shop} alt="stuff"></img>
                    <h2>Choose the business you'd like to refer.</h2>
                    <p>Find your business from the category directory provided.</p>
                </div>

                <div className="col-lg-3">
                    <img className="rounded-circle" src={ladies} alt="stuff"></img>
                    <h2>Send the referral code</h2>
                    <p>Enter your friend's phone number and send the code via text. They get a discount, and you get paid for the referral. It's that easy.</p>
                </div>

                <div className="col-lg-3">
                    <img className="rounded-circle" src={moneytime} alt="stuff" ></img>
                    <h2>Get paid!</h2>
                    <p>Redemption of rewards is easy. We'll get your rewards to you via Venmo or a pre-paid Visa giftcard.</p>
                </div>


            </div>

        </div>
    );
}