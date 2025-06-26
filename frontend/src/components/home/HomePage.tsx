import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/index.css';
import './assets/css/HomePage.css';

const HomePage: React.FC = () => {
  const imagePath = '/images/home/';
  const logoImagePath = '/images/logo/';

  return (
    <div className="container-fluid text-center">
      <div className="row">
        <div className="col d-flex justify-content-center">
          <div className="home-hero-banner">
            <img className="my-3" src={logoImagePath + "inovative-studios.png"}
              alt="#" aria-label="an image link leads to details about the art work" />
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <h5>Welcome to Inovative Studios, Where technology and art converge.
          </h5>
        </div>
      </div>
      <div className="row justify-content-center home-row mt-2">
        <div className="col-12 col-sm-12 col-md-4 col-lg-4 card-col d-flex justify-content-center">
          <div className="card home-card shadow-container flex-fill h-100">
            <Link to="/services" className='home-img-links-container'>
              <img className="home-img-links card-img-top" src={imagePath + "services.png"}
                alt="#" aria-label="an image link leads to details about the art work" />
            </Link>
            <Link to="/services" className="btn main-btn mt-2">
              <h5 className="card-title">Services</h5>
            </Link>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-4 col-lg-4 card-col d-flex justify-content-center">
          <div className="card home-card shadow-container flex-fill h-100">
            <Link to="/entertainment" className='home-img-links-container'>
              <img className="home-img-links card-img-top" src={imagePath + "entertainment.png"}
                alt="#" aria-label="an image link leads to details about the art work" />
            </Link>
            <Link to="/entertainment" className="btn main-btn mt-2">
              <h5 className="">Media Center</h5>
            </Link>
          </div>
        </div>

        <div className="col-12 col-sm-12 col-md-4 col-lg-4 card-col d-flex justify-content-center">
          <div className="card home-card shadow-container flex-fill h-100">
            <Link to="/projects" className='home-img-links-container'>
              <img className="home-img-links card-img-top" src={imagePath + "projects.png"}
                alt="#" aria-label="an image link leads to details about the art work" />
            </Link>
            <Link to="/projects" className="btn main-btn mt-2">
              <h5 className="">Projects</h5>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
