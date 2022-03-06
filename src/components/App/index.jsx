import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MintPage from '../MintPage';
import Home from "../Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mint" element={<MintPage />} />
    </Routes>
  );
}

export default App
