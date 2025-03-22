import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import UserList from './components/Users/UserList';
import EditUser from './components/Users/EditUser';
import { isAuthenticated } from './utils/authUtils';
import { getUsers } from './services/api'; 
import './App.css';


const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const [users, setUsers] = useState([]); // Store user list

  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        setUsers(data.data); // Update users state
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <UserList users={users} setUsers={setUsers} /> 
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users/:id/edit" 
            element={
              <ProtectedRoute>
                <EditUser users={users} setUsers={setUsers} />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
