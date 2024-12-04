import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import AnimalsPage from './pages/Animals';
import ApplicationsPage from './pages/Applications';
import AnimalViewPage from './pages/AniamalView';
import ApplicationView from './pages/ApplicationView';
import LoginPage from './pages/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      {currentUser && <Navbar currentUser={currentUser} />}
      <Routes>
        <Route path="/login" element={<LoginPage setCurrentUser={setCurrentUser} />} />
        {currentUser ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/animals" element={<AnimalsPage role={currentUser} />} />
            <Route path="/applications" element={<ApplicationsPage role={currentUser} />} />
            <Route path="/animalview" element={<AnimalViewPage />} />
            <Route path="/applicationview" element={<ApplicationView role={currentUser} />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
