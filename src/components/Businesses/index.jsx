import React from 'react';
import { NavLink } from 'react-router-dom';
import apexfam from './apexfam.jpg';

export default function Businesses(props) {
    return (
        <div className="album py-5">
        <div className="container">
        <h1 className="test-center">Window Cleaning</h1>
        
       <div className="row py-5">
            <div className="col-md-6">
              <div className="card mb-6 box-shadow">
              <img className="card-img-top" alt="test" src={apexfam} />
                <div className="card-body">
                    <h3>APEX Window Cleaning</h3>
                    <p className="card-text">Columbia, MO</p>
                    <NavLink to='/business' className="btn btn-outline-info btn-block">Refer Me</NavLink>
                  </div>
                </div>
              </div>
            </div>
       </div>
      </div>
    );
};