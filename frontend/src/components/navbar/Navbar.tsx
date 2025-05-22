import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './assets/css/nav.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by looking for the token in localStorage
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/'); // Redirect to the homepage after logging out
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <div className="navbar-content">

          {/* Logo */}
          <div className="nav-logo-container mx-1">
            <Link to="/" className="navbar-brand">
              <h4>Inovative Studios</h4>
            </Link>
          </div>

          {/* Search Bar */}
          {/* <div className="nav-search-container">
            <form className="d-flex">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div> */}

          {/* Burger Menu & Navbar Links */}
          <div className="nav-links-container">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                {token ? (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle mx-3"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userName} {/* Display user's name */}
                    </Link>
                    <ul className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Signup/Login
                    </Link>
                    <ul className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/signup">
                          Signup
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Entertainment
                  </Link>
                  <ul className="dropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/music">
                        Music
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/videos">
                        Video
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/services">
                    Services
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/projects">
                    Projects
                  </Link>
                </li>
                {/* <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle mx-3"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    About us
                  </Link>
                  <ul className="dropdown-menu info-dropdown-menu text-center" aria-labelledby="navbarDropdown">
                    <li>
                      <Link className="dropdown-item" to="/contactUs">
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
