import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Laptop } from 'lucide-react';
import { navLinks } from '../constants';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-lg border-b border-border"
    >
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-text text-2xl font-bold group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Laptop className="text-primary group-hover:text-accent transition-colors duration-300" size={32} />
          </motion.div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:from-accent group-hover:to-primary transition-all duration-500">
            CSI Club
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium group"
            >
              {link.name}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-text focus:outline-none">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="md:hidden bg-background border-t border-border py-4"
        >
          <div className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={toggleMenu}
                className="text-textSecondary hover:text-primary transition-colors duration-300 text-lg font-medium py-2 w-full text-center"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
