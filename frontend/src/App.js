import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import AnimalsPage from './pages/Animals';
import ApplicationsPage from './pages/Applications';
import AnimalViewPage from './pages/AniamalView';

let currentRole = "admin";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/animals" element={<AnimalsPage role={currentRole} />} />
        <Route path="/applications" element={<ApplicationsPage role={currentRole}/>} />
        <Route path="/animalview" element={<AnimalViewPage/>} />
      </Routes>
    </>
  );
}

export default App;
