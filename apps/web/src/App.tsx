import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import SustainabilityDashboard from './pages/SustainabilityDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The sustainability intelligence engine is currently normalizing multi-cloud billing records and computing regional carbon intensities. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<SustainabilityDashboard />} />
          <Route path="/cost" element={<Placeholder name="Cost Intelligence Center" />} />
          <Route path="/carbon" element={<Placeholder name="Carbon Footprint Tracking" />} />
          <Route path="/correlation" element={<Placeholder name="Impact Correlation Hub" />} />
          <Route path="/optimization" element={<Placeholder name="Green-Ops Optimization Hub" />} />
          <Route path="/benchmarking" element={<Placeholder name="Sustainability Goals & Targets" />} />
          <Route path="/reports" element={<Placeholder name="Compliance & ESG Reporting" />} />
          <Route path="/policies" element={<Placeholder name="Sustainability Governance Policies" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
