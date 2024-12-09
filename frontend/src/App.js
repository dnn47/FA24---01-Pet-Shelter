import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import AnimalsPage from './pages/Animals';
import ApplicationsPage from './pages/Applications';
import AnimalViewPage from './pages/AniamalView';
import ApplicationView from './pages/ApplicationView';
import ApplicationForm from './pages/ApplicationForm';
import Login from './pages/Login';
import ReviewApplication from './pages/ReviewApplication';
import AddAnimalForm from './pages/AddAnimalForm';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/application-form" element={<ApplicationForm />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage role={currentUser?.role} />} />
        <Route path="/animals" element={<AnimalsPage role={currentUser?.role} />} />
        <Route path="/applications" element={<ApplicationsPage role={currentUser?.role} />} />
        <Route path="/animalview" element={<AnimalViewPage />} />
        <Route path="/applicationview" element={<ApplicationView role={currentUser?.role} />} />
        <Route path="/review-application" element={<ReviewApplication />} />
        <Route path="/add-animal-form" element={<AddAnimalForm />} />
      </Routes>
    </>
  );
}

export default App;
