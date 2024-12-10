import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/index.css';
import './assets/css/HomePage.css';

const HomePage: React.FC = () => {
  const imagePath = '/images/home/';
  return (
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h1>Inovative Studios</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p>Welcome to Inovative Studios
            <br />
          We make stuff and have fun a long the way!</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card">
                <Link to="/" className='home-img-links-container'>
                  <img className="home-img-links card-img-top" src={imagePath + "services.png"}
                        alt="#" aria-label="an image link leads to details about the art work"/>
                </Link>
              <button className='home-link-button'> services</button>
            </div>
          </div>
          <div className="col">
          <div className="card">
                <Link to="/entertainment" className='home-img-links-container'>
                  <img className="home-img-links card-img-top" src={imagePath + "entertainment.png"}
                        alt="#" aria-label="an image link leads to details about the art work"/>
                </Link>
              <button className='home-link-button'> Media Center</button>
            </div>
          </div>
          <div className="col">
          <div className="card">
                <Link to="/" className='home-img-links-container'>
                  <img className="home-img-links card-img-top" src={imagePath + "projects.png"}
                        alt="#" aria-label="an image link leads to details about the art work"/>
                </Link>
              <button className='home-link-button'>Projects</button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p> We strive to create the world we want to live in. A world of color, and wonder! Where technology and art cross
              <br />
              Contact us today!
            </p>
          </div>
        </div>
      </div>
  );
};

export default HomePage;
