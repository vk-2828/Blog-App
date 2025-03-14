import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

function AuthorProfile() {
  return (
    <div className="author-profile">

      <ul className="d-flex justify-content-around list-unstyled fs-3">
        <li className="nav-item">
          <NavLink to='articles' className="nav-link bg-success rounded p-1">Articles</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='article' className="nav-link bg-success rounded p-1">Add new Article</NavLink>
        </li>
      </ul>
      <div className="mt-2">
        <Outlet />
      </div>  
    </div>
  );

}

export default AuthorProfile
