import {useContext} from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
function AuthorProfile() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  return (
    <div className="author-profile">
    {currentUser.isActive===false?<p className='display-3 text-center text-danger'>Your account is blocked, Please contact Admin </p>:
          <div>
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
            }
        
    </div>
  );

}

export default AuthorProfile
