import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';
import { useSupabaseData } from '../hooks/useSupabaseData';

const HomePage: React.FC = () => {
  const { events, clubSettings, loading, error } = useSupabaseData();

  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Show top 3 upcoming events

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
      <div className="min-h-screen bg-background text-text pt-24 flex items-center justify-center">
        <p className="text-xl text-textSecondary">Loading club data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-text pt-24 flex items-center justify-center">
        <p className="text-xl text-error">Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background text-text pt-14"
    >
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="CSI Club Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
          >
            Innovate. Connect. Inspire.
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="text-textSecondary text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
          >
            Your gateway to the world of Computer Science and Information Technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg shadow-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/50"
            >
              Join Now <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              to="/events"
              className="inline-flex items-center justify-center px-8 py-4 bg-surface text-primary font-bold rounded-xl text-lg shadow-lg hover:bg-surface/80 border border-primary hover:border-primary/80 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/20"
            >
              See Events <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            About Our Club
          </h2>
          <p className="text-textSecondary text-lg leading-relaxed">
            The CSI Club is a vibrant community for students passionate about Computer Science and Information Technology. We organize a variety of events, from hands-on workshops and coding competitions to insightful seminars and networking sessions, fostering a collaborative environment for learning and growth.
          </p>
        </motion.div>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
            <img
              src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Club Activities"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-textSecondary text-lg leading-relaxed">
              Our mission is to empower students with cutting-edge knowledge, practical skills, and a strong professional network. We believe in nurturing talent, encouraging innovation, and preparing our members for successful careers in the ever-evolving tech industry.
            </p>
            <p className="text-textSecondary text-lg leading-relaxed">
              Join us to explore new technologies, collaborate on exciting projects, and connect with like-minded individuals and industry experts.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center px-6 py-3 bg-secondary text-white font-semibold rounded-xl hover:bg-secondary/80 transition-all duration-300 shadow-lg hover:shadow-secondary/50"
            >
              Learn More About Membership <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Upcoming Events Highlight */}
      <section className="bg-surface py-16 md:py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              Upcoming Events
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed">
              Don't miss out on our exciting upcoming events! Mark your calendars and get ready to learn, compete, and connect.
            </p>
          </motion.div>
          {upcomingEvents.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </motion.div>
          ) : (
            <motion.p variants={itemVariants} className="text-center text-textSecondary text-xl py-10">
              No upcoming events scheduled at the moment. Stay tuned!
            </motion.p>
          )}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link
              to="/events"
              className="inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-xl text-lg shadow-lg hover:bg-accent/80 transition-all duration-300 transform hover:scale-105 hover:shadow-accent/50"
            >
              View All Events <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
