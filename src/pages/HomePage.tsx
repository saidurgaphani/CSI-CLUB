import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../components/LoadingSpinner';
import { Hero } from '../components/Hero';
import { Parallax, ParallaxSection } from '../components/Parallax';

const HomePage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchEvents = async () => {
      if (inView) {
        setLoadingEvents(true);
        setEventsError(null);
        try {
          const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: false });

          if (eventsError) throw eventsError;
          setEvents(eventsData || []);
        } catch (err: any) {
          console.error('Error fetching events:', err.message);
          setEventsError(err.message || 'An unknown error occurred');
        } finally {
          setLoadingEvents(false);
        }
      }
    };

    fetchEvents();
  }, [inView]);

  const upcomingEvents = events
    .filter(event => event.status === 'upcoming')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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

  const handleViewAllEventsClick = () => {
    navigate('/events'); // Navigate to the events page
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen text-text"
    >
      <Hero />

      {/* About Section */}
      <ParallaxSection className="container mx-auto px-4 py-16 md:py-24" speed={0.5}>
        <Parallax speed={0.8} direction="up">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              About Our Club
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed">
              The CSI Club is a vibrant community for students passionate about Computer Science and Information Technology. We organize a variety of events, from hands-on workshops and coding competitions to insightful seminars and networking sessions, fostering a collaborative environment for learning and growth.
            </p>
          </motion.div>
        </Parallax>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
          <Parallax speed={1.2} direction="up">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <img
                src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Club Activities"
                className="w-full h-auto object-cover"
              />
            </div>
          </Parallax>
          <Parallax speed={0.6} direction="up">
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
          </Parallax>
        </motion.div>
      </ParallaxSection>

      {/* Upcoming Events Highlight */}
      <ParallaxSection ref={ref} className="bg-surface py-16 md:py-24 border-t border-border" speed={0.4}>
        <div className="container mx-auto px-4">
          <Parallax speed={0.7} direction="up">
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
                Upcoming Events
              </h2>
              <p className="text-textSecondary text-lg leading-relaxed">
                Don't miss out on our exciting upcoming events! Mark your calendars and get ready to learn, compete, and connect.
              </p>
            </motion.div>
          </Parallax>

          {loadingEvents ? (
            <LoadingSpinner />
          ) : eventsError ? (
            <p className="text-center text-error text-xl py-10">Error: {eventsError}</p>
          ) : upcomingEvents.length > 0 ? (
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

          <Parallax speed={0.6} direction="up">
            <motion.div variants={itemVariants} className="text-center mt-12">
              <button
                onClick={handleViewAllEventsClick}
                className="inline-flex items-center px-8 py-4 bg-accent text-white font-bold rounded-xl text-lg shadow-lg hover:bg-accent/80 transition-all duration-300 transform hover:scale-105 hover:shadow-accent/50"
              >
                View All Events <ArrowRight className="ml-2" size={20} />
              </button>
            </motion.div>
          </Parallax>
        </div>
      </ParallaxSection>
    </motion.div>
  );
};

export default HomePage;
