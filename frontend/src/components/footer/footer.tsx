// frontend/src/components/Footer.tsx
import React from 'react';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer text-center mt-3">
      {/* Row 1: Links to Facebook and Instagram */}
      <div className="row">
        <div className="col">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
        <div className="col">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>

      {/* Row 2: Property of Inovative Studios */}
      <div className="row">
        <div className="col">
          <p>Property of Inovative Studios</p>
        </div>
      </div>

      {/* Row 3: Privacy Policy, Terms & Conditions, and Copyright */}
      <div className="row">
        <div className="col">
          <a href="/privacy-policy">Privacy Policy</a>
        </div>
        <div className="col">
          <p>&copy; {new Date().getFullYear()} Inovative Studios</p>
        </div>
        <div className="col">
          <a href="/terms-conditions">Terms & Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
