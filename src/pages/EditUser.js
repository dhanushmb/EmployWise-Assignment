import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', email: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        setError('Failed to load user data.');
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      alert('User updated successfully.');
      // Pass updated user data back to UsersList
      navigate('/users', { state: { updatedUser: response.data.data } });
    } catch (err) {
      setError('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="edit-user-container">
      <h1>Edit User</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
