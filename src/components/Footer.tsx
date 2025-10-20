import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone, Laptop, MessageSquare } from 'lucide-react';
import { navLinks } from '../constants';
import { motion } from 'framer-motion';
import { useSupabaseData } from '../hooks/useSupabaseData';

const Footer: React.FC = () => {
  const { clubSettings, loading, error } = useSupabaseData();

  if (loading || error) {
    // Optionally render a minimal footer or null during loading/error
    return (
      <footer className="bg-surface text-textSecondary py-12 border-t border-border text-center">
        <p>&copy; {new Date().getFullYear()} CSI Club NRCM. All rights reserved.</p>
      </footer>
    );
  }

  return (
    <motion.footer
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      className="bg-surface text-textSecondary py-12 border-t border-border"
    >
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Club Info */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 text-text text-2xl font-bold mb-4">
            <Laptop className="text-primary" size={28} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              CSI Club
            </span>
          </Link>
          <p className="text-sm leading-relaxed max-w-md">
            Empowering students with knowledge and skills in Computer Science and Information Technology through workshops, events, and community engagement.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-text text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="hover:text-primary transition-colors duration-300 text-sm">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-text text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="space-y-2 mb-4">
            <a href={`mailto:${clubSettings?.contact_email || '#'}`} className="flex items-center gap-2 hover:text-primary transition-colors duration-300 text-sm">
              <Mail size={18} /> {clubSettings?.contact_email || 'N/A'}
            </a>
            <a href={`tel:${clubSettings?.phone_number || '#'}`} className="flex items-center gap-2 hover:text-primary transition-colors duration-300 text-sm">
              <Phone size={18} /> {clubSettings?.phone_number || 'N/A'}
            </a>
          </div>
          <div className="flex gap-4">
            {/* <a href={clubSettings?.social_media.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
              <Facebook size={24} />
            </a> */}
            <a href={clubSettings?.social_media.whatsapp || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
              <MessageSquare size={24} />
            </a>
            <a href={clubSettings?.social_media.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
              <Instagram size={24} />
            </a>
            <a href={clubSettings?.social_media.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            

          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center mt-10 pt-8 border-t border-border text-sm">
        <p>&copy; {new Date().getFullYear()} CSI Club NRCM. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
