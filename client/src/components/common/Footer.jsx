import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <div className='bg-dark text-white py-4 mt-5'>
      <div className='container d-flex justify-content-between align-items-center flex-wrap'>
        {/* Contact Information */}
        <div className='footer-section'>
          <h5>Contact Us</h5>
          <p>Email: vamshikrishnadaripelli22@gmail.com</p>
          <p>Address: VNR VJIET , BACHUPALLY , HYDERABAD</p>
        </div>
        
        {/* Version Info */}
        <div className='footer-section'>
          <h5>BlogApp</h5>
          <p>Version: 1.0.0</p>
        </div>

        {/* Social Media Links */}
        {/* <div className='footer-section d-flex gap-3'>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/174/174848.png" alt="Facebook" width="30" height="30" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="30" height="30" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="30" height="30" />
          </a>
        </div> */}
      </div>
    </div>
  );
}

export default Footer;
