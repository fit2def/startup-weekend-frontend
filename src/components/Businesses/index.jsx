import React from 'react';

export default function Businesses(props) {
    return (
        <div className="album py-5">
        <div className="container">
        <h1>Pest Control</h1>
        
       <div className="row py-5">
            <div className="col-md-6">
              <div className="card mb-6 box-shadow">
                  <img className="card-img-top" alt="test" src="https://lh5.googleusercontent.com/p/AF1QipM-8aOKoeDGQqFVZK1KhaeO9-WH0Qfy0eJcVdAu=w213-h160-k-no" />
                <div className="card-body">
                    <h3>Guardian Pest Control</h3>
                    <p className="card-text">Pest Control<br></br>Columbia</p>
                  <a href="/business" className="btn btn-outline-info btn-block">Refer Me</a>
                  </div>
                </div>
              </div>
            </div>
       </div>
      </div>
    );
};