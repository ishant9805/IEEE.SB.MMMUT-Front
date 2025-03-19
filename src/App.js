import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
// import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import AdminDashboard from './pages/AdminDashboard';
import AdminContactSubmissions from './pages/AdminContactSubmissions'; 
import AdminAnnouncements from './pages/AdminAnnouncements';
import DeepSeekBackground from "./components/DeepSeekBackground";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      {/* Background layer - lowest z-index */}
      <div className="fixed inset-0 z-0">
        <DeepSeekBackground />
      </div>

      {/* Content layer - higher z-index */}
      <div className="min-h-screen flex flex-col">
        {/* Navbar with semi-transparent background */}
        <div className="sticky top-0 z-50 bg-ieee-blue/90 backdrop-blur-sm">
          <Navbar />
        </div>

        {/* Main content area */}
        <main className="flex-1 relative z-30">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="dashboard" element={<div>Dashboard Content</div>} />
              <Route path="announcements" element={<AdminAnnouncements />} />
              <Route path="contact-submissions" element={<AdminContactSubmissions />} />
              <Route path="settings" element={<div>Settings Content</div>} />
            </Route>
          </Routes>
        </main>

        {/* Footer */}
        <Footer className="relative z-30" />
      </div>
    </Router>
  );
}

export default App;
