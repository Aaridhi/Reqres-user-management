
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../services/api';
import { removeToken } from '../../utils/authUtils';
import UserCard from './UserCard';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const navigate = useNavigate();

  const fetchUsers = async (pageNum) => {
    setLoading(true);
    try {
      const data = await getUsers(pageNum);
      setUsers(data.data);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  const handleEdit = (userId) => {
    navigate(`/users/${userId}/edit`);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        showNotification('User deleted successfully', 'success');
      } catch (err) {
        showNotification('Failed to delete user', 'error');
      }
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h1>User Management Dashboard</h1>
        <div className="header-actions">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <>
          <div className="user-grid">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onEdit={() => handleEdit(user.id)}
                  onDelete={() => handleDelete(user.id)}
                />
              ))
            ) : (
              <div className="no-results">No users found matching your search.</div>
            )}
          </div>

          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="page-info">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;