import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.updatedUser) {
      // Update the specific user in the local state
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === location.state.updatedUser.id ? location.state.updatedUser : user
      ));
      fetchUsers();
    } else {
      fetchUsers();
    }
  }, [currentPage, location.state]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response.status === 204) {
        alert('User deleted successfully.');
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again later.');
    }
  };

  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="users-container">
      <h1><i className="fas fa-users"></i> Users List</h1>
      <button onClick={handleLogout} className="logout-button"><i className="fas fa-sign-out-alt"></i> Logout</button>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="avatar" /></td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}><i className="fas fa-edit"></i> Edit</button>
                <button onClick={() => handleDelete(user.id)} className="delete-button"><i className="fas fa-trash"></i> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <i className="fas fa-chevron-left"></i> Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default UsersList;
