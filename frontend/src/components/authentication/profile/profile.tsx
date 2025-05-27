import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');


    return (
        <div className="container text-center mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 shadow-container p-4">
                    <h2>Welcome to your profile</h2>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
