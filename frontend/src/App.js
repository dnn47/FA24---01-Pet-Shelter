import React from 'react';
import { Routes, Route } from 'react-router-dom';

function UserPage() {
  return <h1>User Page</h1>;
}

function AnimalsPage() {
  return <h1>Animals Page</h1>;
}

function ApplicationPage() {
  return <h1>Application Page</h1>;
}

function HomePage() {
  return <h1>Welcome to the Home Page</h1>;
}

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/animals" element={<AnimalsPage />} />
        <Route path="/application" element={<ApplicationPage />} />
      </Routes>
    </div>
  );
}

export default App;
