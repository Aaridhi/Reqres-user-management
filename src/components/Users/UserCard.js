
import React from 'react';
import './UserCard.css';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
      </div>
      <div className="user-info">
        <h3>{user.first_name} {user.last_name}</h3>
        <p className="user-email">{user.email}</p>
      </div>
      <div className="user-actions">
        <button onClick={onEdit} className="edit-button">
          Edit
        </button>
        <button onClick={onDelete} className="delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;