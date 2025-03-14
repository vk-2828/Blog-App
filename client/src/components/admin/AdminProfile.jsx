import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'
function AdminProfile() {
  return (
    <div>
      <ul className="d-flex justify-content-around list-unstyled fs-3">
          <li className="nav-item">
              <NavLink to='allusers' className="nav-link bg-success rounded p-1">All users</NavLink>
          </li>
      </ul>
      <div className="mt-2">
          <Outlet />
      </div>  
    </div>
  )
}

export default AdminProfile
