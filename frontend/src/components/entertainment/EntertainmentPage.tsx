import React from 'react';
import './assets/css/EntertainmentPage.css';
import { Link } from 'react-router-dom';
import videoCover from '../assets/images/entertianment/videoCover.png'
import musicCover from '../assets/images/entertianment/Front-cover-art.jpg'


const EntertainmentPage: React.FC = () => {
  return (
    <div className="container-fluid text-center">
      <div className="row ent-row ">
        <div className="my-3 page-titles justify-content-center">
          <h1 className="entertainment-header mb-3">Media Center</h1>
          <p>Enjoy orignal content exclusively found here at Inovative studios,
            <br />
            We have curated the most interesting content out there, and we continue to grow our catalouge.
          </p>
        </div>
        <div className="ent-card-wrapper d-flex flex-grow-1">
          <div className="ent-card-container">
            <div className="entertainment-card shadow-container">
              <img
                className="entertainment-img"
                src={videoCover}
                alt="Movies"
                aria-label="Movies section"
              />
              <h2 className='mt-3 btn'>Stream Videos here!</h2>
            </div>
            <Link to="/music">
              <div className="entertainment-card shadow-container">
                <img
                  className="entertainment-img"
                  src={musicCover}
                  alt="Music"
                  aria-label="Music section"
                />
                <h2 className='mt-3 btn'>Listen to music header!</h2>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentPage;
