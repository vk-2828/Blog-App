import React from 'react'
import { Link, Outlet } from 'react-router-dom';

function UserProfile() {
  return (
    <div>
      <ul className="d-flex justify-content-around list-unstyled fs-3">
              <li className="nav-item">
                <Link to='articles' className="nav-link bg-success rounded p-1">Articles</Link>
              </li>
            </ul>
            <div className="mt-2">
              <Outlet />
            </div>
    </div>
  )
}

export default UserProfile
