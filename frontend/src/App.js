import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import AnimalsPage from './pages/Animals';
import ApplicationsPage from './pages/Applications';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
      </Routes>
    </>
  );
}

export default App;
