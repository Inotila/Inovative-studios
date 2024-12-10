import React from 'react';
import '../assets/index.css';
import './assets/css/EntertainmentPage.css';

const EntertainmentPage: React.FC = () => {
  const imagePath = '/images/entertainment/';

  return (
    <div className="container text-center">
      {/* Row 1: Header */}
      <div className="row">
        <div className="col">
          <h1 className="entertainment-header">Media Center</h1>
        </div>
      </div>

      {/* Row 2: Two Columns */}
      <div className="row">
        <div className="col">
          <div className="entertainment-card">
            <img
              className="entertainment-img"
              src={imagePath + "movie.png"}
              alt="Movies"
              aria-label="Movies section"
            />
            <p>Explore the latest movies!</p>
          </div>
        </div>
        <div className="col">
          <div className="entertainment-card">
            <img
              className="entertainment-img"
              src={imagePath + "music.png"}
              alt="Music"
              aria-label="Music section"
            />
            <p>Dive into trending music!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntertainmentPage;
