import { useContext, useEffect, useState } from "react";
import { userAuthorContextObj } from "../../contexts/UserAuthorContext";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAuthorContextObj);
  const { isSignedIn, user, isLoaded,isActive } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log("current user from home",isActive)
  async function onSelectRole(e) {
    setError("");
    const selectedRole = e.target.value;
    currentUser.role = selectedRole;
    console.log("Selected role:",selectedRole)
    let res = null;
    try {
      if (selectedRole === "author") {
        res = await axios.post("http://localhost:3000/author-api/author", currentUser);
        let { message, payload } = res.data;
        if (message === "author") {
          setCurrentUser({ ...currentUser, ...payload });
          //console.log("payload fromhome",payload)

          localStorage.setItem("currentUser", JSON.stringify(payload));
        } else {
          setError(message || "Something went wrong, Invalid Role");
        }
      }
      if (selectedRole === "user" ) {
        res = await axios.post("http://localhost:3000/user-api/user", currentUser);
        let { message, payload } = res.data;
        if (message === "user") {
          setCurrentUser({ ...currentUser, ...payload });
          //console.log("payload fromhome",payload)

          localStorage.setItem("currentUser", JSON.stringify(payload));
        } else {
          setError(message || "Something went wrong, Invalid Role");
        }
      }
      if (selectedRole === "admin") {
        res = await axios.post("http://localhost:3000/admin-api/admin", currentUser);
        let { message, payload } = res.data;
        if (message === "admin") {
          //console.log("payload fromhome",payload)

          setCurrentUser({ ...currentUser, ...payload });
          localStorage.setItem("currentUser", JSON.stringify(payload));
        } else {
          setError(message || "Something went wrong, Invalid Role");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (isSignedIn === true) {
      setCurrentUser({
        ...currentUser,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.emailAddresses[0].emailAddress,
        profileImageUrl: user.imageUrl,
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    if (currentUser?.role === "user" && error.length === 0) {
      navigate(`/user-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "author" && error.length === 0) {
      navigate(`/author-profile/${currentUser.email}`);
    }
    if (currentUser?.role === "admin" && error.length === 0) {
      navigate(`/admin-profile/${currentUser.email}`);
    }
  }, [currentUser]);

  console.log("After all effects from home :",currentUser)
  return (
    <div className="container mt-5">
      {!isSignedIn ? (
        <div>
            <div className="text-center p-5 bg-light rounded shadow">
                <h1 className="text-primary fw-bold">Welcome to the Blog App!</h1>
                <p className="lead text-secondary">
                  A place where Authors share insightful articles and Users engage through comments.
                </p>
                <p className="text-muted">Sign in to explore and contribute.</p>
            </div>

            <div className="text-center mt-5 p-3 ">
            <h5 className="fw-bold text-secondary">Why Join Our Blog Platform?</h5>
            <p className="text-muted">✔ Share your knowledge and insights with a broad audience.</p>
            <p className="text-muted">✔ Engage in discussions and exchange ideas with fellow readers.</p>
            <p className="text-muted">✔ Stay updated with the latest trends and articles from various topics.</p>
          </div>
          <div className="text-center">
            <img src="https://bloggerspassion.com/wp-content/uploads/2020/03/Best-Blogging-Apps.webp" alt="" />
          </div>
        </div>
      ) : (
            <div className="container a">
          <div className="d-flex flex-column align-items-center  text-white p-4 rounded shadow-sm" style={{ backgroundColor: 'rgb(135, 206, 235)	' }}>
            <img
              src={user.imageUrl}
              alt="User"
              className="rounded-circle border border-white shadow"
              width="80"
              height="80"
            />
            <p className="display-6 fw-semibold mt-2">{user.firstName}</p>
          </div>

          <div className="text-center mt-4">
            <h5 className="fw-bold text-dark">Select Your Role</h5>
          </div>

          {error && <p className="text-danger text-center fs-5">{error}</p>}

          <div className="d-flex justify-content-center gap-4 py-3 ">
            <div className="form-check">
              <input
                type="radio"
                id="author"
                name="role"
                value="author"
                className="form-check-input"
                onChange={onSelectRole}
              />
              <label htmlFor="author" className="form-check-label fw-medium text-dark">
                Author
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="user"
                name="role"
                value="user"
                className="form-check-input"
                onChange={onSelectRole}
              />
              <label htmlFor="user" className="form-check-label fw-medium text-dark">
                User
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                className="form-check-input"
                onChange={onSelectRole}
              />
              <label htmlFor="admin" className="form-check-label fw-medium text-dark">
                Admin 
              </label>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default Home;
