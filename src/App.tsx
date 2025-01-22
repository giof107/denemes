import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { RafflePage } from './pages/RafflePage';

function App() {
  return (
    <div className="min-h-screen bg-[#0A1F1C]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/raffle/:id" element={<RafflePage />} />
      </Routes>
    </div>
  );
}

export default App;