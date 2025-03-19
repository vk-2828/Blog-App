import {useContext} from 'react'
import { Link, Outlet } from 'react-router-dom';
import { userAuthorContextObj } from '../../contexts/UserAuthorContext';
function UserProfile() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  console.log('Current user from user-profile',currentUser)
  return (
    <div>
      {currentUser.isActive===false?<p className='display-3 text-center text-danger'>Your account is blocked, Please contact Admin </p>:
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
        }
    </div>
  )
}

export default UserProfile
