
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../../services/api';
import './EditUser.css';

const EditUser = ({ users, setUsers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        
        const data = await getUsers();
        const foundUser = data.data.find(u => u.id === parseInt(id));
        
        if (foundUser) {
          setUser({
            first_name: foundUser.first_name,
            last_name: foundUser.last_name,
            email: foundUser.email || ''
          });
        } else {
          setError('User not found');
        }
      } catch (err) {
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateUser(id, user);

      
      setUsers(prevUsers => prevUsers.map(u => (u.id === parseInt(id) ? { ...u, ...user } : u)));

      showNotification('User updated successfully', 'success');
      setTimeout(() => navigate('/users'), 1500);

    } catch (err) {
      showNotification('Failed to update user', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  if (loading) {
    return <div className="loading">Loading user data...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-user-container">
      <div className="edit-user-card">
        <h2>Edit User</h2>
        
        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={() => navigate('/users')} className="cancel-button">
              Cancel
            </button>
            <button type="submit" className="save-button">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;