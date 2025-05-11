import React from 'react';
import './assets/css/EntertainmentPage.css';
import { Link } from 'react-router-dom';
import videoCover from '../assets/images/entertianment/videoCover.png'
import musicCover from '../assets/images/entertianment/Front-cover-art.jpg'


const EntertainmentPage: React.FC = () => {
  return (
    <div className="container-fluid text-center">
      <div className="row ent-row ">
        <div className="my-3 page-title">
          <h1 className="entertainment-header">Media Center</h1>
        </div> <div className="ent-card-wrapper d-flex flex-grow-1">
          <div className="ent-card-container">
            <div className="entertainment-card shadow-container">
              <img
                className="entertainment-img"
                src={videoCover}
                alt="Movies"
                aria-label="Movies section"
              />
              <p>Explore the latest movies!</p>
            </div>
            <Link to="/music">
              <div className="entertainment-card shadow-container">
                <img
                  className="entertainment-img"
                  src={musicCover}
                  alt="Music"
                  aria-label="Music section"
                />
                <p>Dive into trending music!</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentPage;
