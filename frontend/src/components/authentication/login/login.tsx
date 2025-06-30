import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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

        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', formData);
            const { token, user } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            setSuccess(`Welcome, ${user.name}!`);

            setTimeout(() => {
                navigate('/profile');  // Redirect to profile
            }, 1000);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Login failed');
        }
    };


    return (
        <div className="container text-center mt-2">
            <div className="row justify-content-center">
                <div className="col-md-6 shadow-container d-flex flex-column">
                    <h2 className="mb-2">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}

                    <form onSubmit={handleSubmit}>
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

                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
