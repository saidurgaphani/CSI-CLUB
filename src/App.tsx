import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import JoinPage from './pages/JoinPage';
import ContactPage from './pages/ContactPage';
import MembersPage from './pages/MembersPage';
import EventRegistrationPage from './pages/EventRegistrationPage'; // Import the new page
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import ScrollToTop from "./components/ScrollToTop";
import { AnimeNavBar } from './components/ui/anime-navbar';
import { Home, Calendar, Users, UserPlus, Mail } from 'lucide-react';

const navItems = [
  {
    name: "Home",
    url: "/",
    icon: Home,
  },
  {
    name: "Events",
    url: "/events",
    icon: Calendar,
  },
  {
    name: "Members",
    url: "/members",
    icon: Users,
  },
  {
    name: "Join Us",
    url: "/join",
    icon: UserPlus,
  },
  {
    name: "Contact",
    url: "/contact",
    icon: Mail,
  },
];

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AnimeNavBar items={navItems} defaultActive="Home" />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/members" element={<MembersPage />} />
              <Route path="/join" element={<JoinPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/register" element={<EventRegistrationPage />} /> {/* Add the new route */}
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
