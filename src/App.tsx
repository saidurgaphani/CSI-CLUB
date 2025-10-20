import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';
import MembersPage from './pages/MembersPage'; // Import MembersPage
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
// import AnimatedRoutes from "./components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/members" element={<MembersPage />} /> {/* Add MembersPage route */}
              <Route path="/join" element={<JoinPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </main>
        <ScrollToTop /> 
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
