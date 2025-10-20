import React from 'react';
import { Mail, Phone, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSupabaseData } from '../hooks/useSupabaseData';

const ContactPage: React.FC = () => {
  const { clubSettings, loading, error } = useSupabaseData();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text pt-14 flex items-center justify-center">
        <p className="text-xl text-textSecondary">Loading contact details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-text pt-14 flex items-center justify-center">
        <p className="text-xl text-error">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background text-text pt-14 pb-16"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20"
      >
        <img
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-background/60"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            We'd love to hear from you! Reach out to us through any of the channels below.
          </motion.p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <motion.div variants={itemVariants} className="bg-surface rounded-2xl p-8 shadow-xl border border-border">
            <h2 className="text-3xl font-bold text-text mb-6">Our Details</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Mail size={28} className="text-primary" />
                <div>
                  <h3 className="text-xl font-semibold text-text">Email Us</h3>
                  <a href={`mailto:${clubSettings?.contact_email || '#'}`} className="text-textSecondary hover:text-primary transition-colors duration-300">
                    {clubSettings?.contact_email || 'N/A'}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone size={28} className="text-primary" />
                <div>
                  <h3 className="text-xl font-semibold text-text">Call Us</h3>
                  <a href={`tel:${clubSettings?.phone_number || '#'}`} className="text-textSecondary hover:text-primary transition-colors duration-300">
                    {clubSettings?.phone_number || 'N/A'}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-semibold text-text">Follow Us</h3>
                <div className="flex gap-4 ml-auto">

                  {/* <a href={clubSettings?.social_media.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
                    <Facebook size={28} />
                  </a> */}
                  <a href={clubSettings?.social_media.whatsapp || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
                    <MessageSquare size={28} />
                  </a>
                  <a href={clubSettings?.social_media.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
                    <Instagram size={28} />
                  </a>
                  <a href={clubSettings?.social_media.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors duration-300">
                    <Linkedin size={28} />
                  </a>
                  

                </div>
              </div>
            </div>
          </motion.div>

          {/* Map/Location (Placeholder) */}
          <motion.div variants={itemVariants} className="bg-surface rounded-2xl p-8 shadow-xl border border-border">
            <h2 className="text-3xl font-bold text-text mb-6">Our Location</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.842911916916!2d78.4535264750557!3d17.56266419773235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8f9e56c187c5%3A0x4ae6789c2b9c5baf!2sNarsimha%20Reddy%20Engineering%20College%20(NRCM)!5e0!3m2!1sen!2sin!4v1760937895084!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="College Location"
              ></iframe>
            </div>
            <p className="text-textSecondary text-sm mt-4">
              Visit us at the main campus of our college. Specific office hours can be arranged by appointment.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
