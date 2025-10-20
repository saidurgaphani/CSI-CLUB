import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Import your pages

import ContactPage from "../pages/ContactPage";
import JoinPage from "../pages/JoinPage";
import MembersPage from "../pages/MembersPage";
import EventsPage from "../pages/EventsPage";
import HomePage from "../pages/HomePage";

const AnimatedRoutes = () => {
  const location = useLocation();

  // Reset scroll on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/members" element={<MembersPage />} /> {/* Add MembersPage route */}
            <Route path="/join" element={<JoinPage />} />
            <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
