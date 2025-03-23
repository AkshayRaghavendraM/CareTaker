import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import MedicineReminder from './pages/MedicineReminder';
import HospitalFinder from './pages/HospitalFinder';
import MedicalTips from './pages/MedicalTips';
import Emergency from './pages/Emergency'; // ✅ Import Emergency Page

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/medicine-reminder" element={<MedicineReminder />} />
            <Route path="/hospital-finder" element={<HospitalFinder />} />
            <Route path="/medical-tips" element={<MedicalTips />} />
            <Route path="/emergency" element={<Emergency />} /> {/* ✅ Add Emergency Route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
