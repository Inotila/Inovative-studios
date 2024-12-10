import React from 'react';
import '../assets/index.css';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
      <div className="container">
        <div className="row">
          <div className="col">
            <p>Row 1: Content goes here.</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Row 2: Content goes here.</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Row 3: Content goes here.</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Row 4: Content goes here.</p>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
