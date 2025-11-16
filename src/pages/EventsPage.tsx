import React, { useState } from 'react';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { Parallax, ParallaxImage, ParallaxSection } from '../components/Parallax';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ArrowRight } from 'lucide-react'; // Import ArrowRight

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const { events, loading, error } = useSupabaseData();
  const navigate = useNavigate(); // Initialize useNavigate

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Sort ascending by date
  });

  const filteredEvents = sortedEvents.filter(event => {
    if (filter === 'all') return true;
    return event.status === filter;
  });

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

  const handleRegisterClick = () => {
    navigate('/register'); // Navigate to the registration page
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-text pt-14 flex items-center justify-center">
        <p className="text-xl text-textSecondary">Loading events...</p>
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
        className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/20"
      >
        <ParallaxImage
          src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Events Background"
          speed={0.8}
        />
        <div className="absolute inset-0 bg-background/60 z-10"></div>
        <div className="relative z-20 text-center">
          <Parallax speed={0.9} direction="up">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent mb-4"
            >
              Our Events
            </motion.h1>
          </Parallax>
          <Parallax speed={0.7} direction="up">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto"
            >
              Explore our exciting lineup of upcoming workshops, competitions, and seminars, and relive memories from our past events.
            </motion.p>
          </Parallax>
        </div>
      </motion.section>

      <ParallaxSection className="container mx-auto px-4 py-16" speed={0.5}>
        {/* Filter Buttons */}
        <Parallax speed={0.6} direction="up">
          <motion.div variants={itemVariants} className="flex justify-center gap-4 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${filter === 'upcoming'
                ? 'bg-primary text-white shadow-lg shadow-primary/40'
                : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
                }`}
            >
              Upcoming Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('past')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${filter === 'past'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/40'
                : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
                }`}
            >
              Past Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${filter === 'all'
                ? 'bg-accent text-white shadow-lg shadow-accent/40'
                : 'bg-surface text-textSecondary hover:bg-surface/80 border border-border'
                }`}
            >
              All Events
            </motion.button>
          </motion.div>
        </Parallax>

        {/* Event Grid */}
        <Parallax speed={0.8} direction="up">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <motion.p variants={itemVariants} className="col-span-full text-center text-textSecondary text-xl py-10">
                No {filter} events found at the moment. Check back soon!
              </motion.p>
            )}
          </motion.div>
        </Parallax>
      </ParallaxSection>
    </motion.div>
  );
};

export default EventsPage;
