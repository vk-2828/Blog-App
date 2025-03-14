import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useClerk, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

function Header() {
  const { signOut } = useClerk();
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  async function handleSignOut() {
    await signOut();
    setCurrentUser(null);
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-3 py-2" style={{ backgroundColor: 'rgb(4,177,254)' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center text-center">
        {/* Logo */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-white fw-bold fs-4">
          <img 
            src="https://pbwebdev.co.uk/wp-content/uploads/2018/12/blogs.jpg" 
            alt="Blog Logo" 
            width="120" 
            height="37" 
            className=""
            style={{ objectFit: 'cover', maxHeight: '40px' }}
          />
        </Link>

        {/* Navigation Links */}
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex gap-3 align-items-center">
            {!isSignedIn ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-white fw-medium">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signin" className="nav-link text-white fw-medium">Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link text-white fw-medium">Sign Up</Link>
                </li>
              </>
            ) : (
              <div className="d-flex align-items-center gap-3">
                {/* User Image & Role */}
                <div className="text-center position-relative">
                  <img
                    src={user.imageUrl}
                    className="rounded-circle border border-light shadow-sm"
                    width="40"
                    height="40"
                    alt="User Profile"
                  />
                  <p className="mb-0 mt-1 text-white fw-semibold">{user.firstName}</p>
                  <span className="badge bg-danger position-absolute top-0 end-0" style={{ fontSize: "10px" }}>
                    {currentUser.role}
                  </span>
                </div>

                {/* Sign Out Button */}
                <button
                  className="btn btn-outline-light btn-sm fw-bold px-3 py-1 rounded-pill shadow-sm"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;