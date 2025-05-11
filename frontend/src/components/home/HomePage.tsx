import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/index.css';
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
          <h5>Welcome to Inovative Studios
            <br />
            We make stuff because we can!</h5>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-12 col-md-4 card-col d-flex mt-1 mb-3">
          <div className="card shadow-container homepage-card flex-fill h-100">
            <Link to="/" className='home-img-links-container'>
              <img className="home-img-links card-img-top" src={imagePath + ""}
                alt="#" aria-label="an image link leads to details about the art work" />
            </Link>
            <Link to="#" className="btn main-btn mt-2">
              <h5 className="card-title">Services</h5>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 card-col d-flex mt-1 mb-3">
          <div className="card shadow-container homepage-card flex-fill h-100">
            <Link to="/entertainment" className='home-img-links-container'>
              <img className="home-img-links card-img-top" src={imagePath + "entertainment.png"}
                alt="#" aria-label="an image link leads to details about the art work" />
            </Link>
            <Link to="/entertainment" className="btn main-btn mt-2">
              <h5 className="">Media Center</h5>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 card-col d-flex mt-1 mb-3">
          <div className="card shadow-container homepage-card flex-fill h-100">
            <Link to="/" className='home-img-links-container'>
              <img className="home-img-links card-img-top" src={imagePath + "projects.png"}
                alt="#" aria-label="an image link leads to details about the art work" />
            </Link>
            <Link to="#" className="btn main-btn mt-2">
              <h5 className="">Projects</h5>
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <p> We strive to create the world we want to live in. A world of color, and wonder! Where technology and art converge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
