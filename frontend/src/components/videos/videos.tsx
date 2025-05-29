import React from 'react';
import { Link } from 'react-router-dom';
import './assets/css/video.css';
import videoCover from '../assets/images/entertianment/videoCover.png'

const VideoPage: React.FC = () => {
    return (
        <div className="container text-center">
            <div className="row w-100">
                <div className="col w-100">
                    <div className='shadow-container temp-video-container'>
                        <img src={videoCover} alt="" />
                        <h2>Thermo & Bill (season 1) - coming soon!</h2>
                        <div className='d-flex mt-2'>
                            <p>{`Stream music >`}</p>
                            <Link to="/music">
                                <p className=' mx-2 btn'>Listen to music</p>
                            </Link></div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default VideoPage;
