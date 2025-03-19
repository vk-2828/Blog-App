import { createContext, useState, useEffect } from 'react';

export const userAuthorContextObj = createContext();

function UserAuthorContext({ children }) {
    let [currentUser, setCurrentUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        profileImageUrl: '',
        role: '',
        isActive:''
    });

    // Load user data from localStorage when the page reloads
    useEffect(() => {
        let userInStorage = localStorage.getItem('currentUser');
        if (userInStorage) {
            setCurrentUser(JSON.parse(userInStorage));
        }
    }, []);

    // Update localStorage whenever currentUser changes
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    // Logout function to clear localStorage and reset currentUser
    function logout() {
        localStorage.removeItem("currentUser");
        setCurrentUser({
            firstName: '',
            lastName: '',
            email: '',
            profileImageUrl: '',
            role: '',
            isActive:''
        });
    }

    return (
        <userAuthorContextObj.Provider value={{ currentUser, setCurrentUser, logout }}>
            {children}
        </userAuthorContextObj.Provider>
    );
}

export default UserAuthorContext;
