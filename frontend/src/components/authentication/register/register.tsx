import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/auth.css'

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (formData.password.length < 8) {
            setError('Password should be at least 8 characters long');
            return;
        }

        try {
            await axios.post('http://localhost:3001/api/auth/register', formData);
            setSuccess('Registration successful! Redirecting...');
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Something went wrong');
        }
    };


    return (
        <div className="container text-center">
            <div className="row justify-content-center">
                <div className="col auth-container shadow-container">
                    <h2 className="mb-2">Register</h2>
                    <h4>Get access to more features and content by creating an account.</h4>
                    <p className='terms-and-conditions'>
                        In creating this account inovative agrees to not share your  personal data,
                        <br /> and to up hold a healthy eco system. You as the owner of this account
                        <br /> agree in turn to not duplicate content found here for comercial gain or distribution,
                        <br />unless given such authorization explicitly.
                    </p>

                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit} className='mt-2'>
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-3"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control mb-3"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="btn btn-primary w-100">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
