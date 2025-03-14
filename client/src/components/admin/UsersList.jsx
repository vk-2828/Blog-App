import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function UsersList() {
    const [userslist, setUserAuthor] = useState([]);

    // Fetch users from backend
    async function getUserAuthors() {
        try {
            const res = await axios.get('http://localhost:3000/admin-api/userauthors');
            console.log("Data from response: ", res.data);
            if (res.data.message === "All user and authors") {
                setUserAuthor(res.data.payload); 
            }
        } catch (err) {
            console.log("Error getting users: ", err);
        }
    }

    useEffect(() => {
        getUserAuthors();
    }, []);

    //block user function
    async function blockUser(email) {
        try {
            // Find the user first
            const user = userslist.find(user => user.email === email);
    
            // Update isActive status
            const updatedUser = { ...user, isActive: false };
    
            // Send updated user data to backend
            let res = await axios.put(`http://localhost:3000/admin-api/usersupdate/${email}`, updatedUser);
    
            if (res.data.message === "User or Author modified") {
                // Update the state with the modified users list
                const updatedUsers = userslist.map(user => 
                    user.email === email ? updatedUser : user
                );
                setUserAuthor(updatedUsers);
                alert(`User ${email} has been blocked!`);
            } else {
                console.log('Error in updating');
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }
    
    
        //Unblock user function
        async function UnblockUser(email) {
            try {
                // Find the user first
                const user = userslist.find(user => user.email === email);
        
                // Update isActive status
                const updatedUser = { ...user, isActive: true };
        
                // Send updated user data to backend
                let res = await axios.put(`http://localhost:3000/admin-api/usersupdate/${email}`, updatedUser);
        
                if (res.data.message === "User or Author modified") {
                    // Update the state with the modified users list
                    const updatedUsers = userslist.map(user => 
                        user.email === email ? updatedUser : user
                    );
                    setUserAuthor(updatedUsers);
                    alert(`User ${email} has been Unblocked!`);
                } else {
                    console.log('Error in updating');
                }
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Users List</h2>
            
            {userslist.length === 0 ? (
                <p className="text-center text-danger">No users found</p>
            ) : (
                <table className="table table-bordered table-striped shadow-lg">
                    <thead className="table-dark text-center">
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userslist.map((user) => (
                            <tr key={user.email} className="text-center align-middle">
                                <td>{user.email}</td>
                                <td>{user.firstName}</td>
                                <td>{user.role}</td>
                                <td>
                                    {user.isActive===true?
                                    <button 
                                    className="btn btn-danger btn-sm" 
                                    onClick={() => blockUser(user.email)}
                                >
                                    Block
                                </button>
                                :
                                <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => UnblockUser(user.email)}
                            >
                                UnBlock
                            </button>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UsersList;
