import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Loader2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Button } from '../components/ui/button';

interface EventDetail {
  id: string;
  title: string | null;
  description: string | null;
  date: string | null;
  venue: string | null;
  venue_location: string | null;
  iframe: string | null;
  details: string | null;
}

const EventRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const eventId = searchParams.get('eventId');
  const [eventDetails, setEventDetails] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { opacity: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
  };

  useEffect(() => {
    const fetchEventDetails = async () => {
      if (!eventId) {
        setError('Event ID not provided.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('events')
          .select('id, title, description, date, venue, venue_location, iframe, details')
          .eq('id', eventId)
          .single();

        if (error) {
          setError(error.message);
          console.error('Error fetching event details:', error);
        }

        if (data) {
          setEventDetails(data as EventDetail);
        } else {
          setError('Event not found.');
        }
      } catch (error: any) {
        setError(error.message || 'Failed to load event details.');
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/events');
    }
  };

  if (loading) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-textSecondary text-lg">Loading event details...</p>
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-surface rounded-3xl p-8 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-error text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-text mb-2">Error</h2>
          <p className="text-textSecondary mb-6">{error}</p>
          <Button onClick={handleBack} variant="outline" className="w-full">
            <ArrowLeft className="mr-2" size={18} /> Go Back
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <style>{`
        .iframe-container {
          position: relative;
          overflow: hidden;
          width: 100%;
          padding-top: 120%; /* 5:6 aspect ratio */
        }
        @media (min-width: 768px) {
          .iframe-container {
            padding-top: 75%; /* 4:3 aspect ratio */
          }
        }
        .iframe-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-10 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleBack}
          className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10 bg-surface/80 backdrop-blur-md hover:bg-surface border border-border rounded-xl px-3 py-2 sm:px-4 text-sm sm:text-base text-textSecondary hover:text-text transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back
        </motion.button>

        <div className="container mx-auto px-4 py-20 sm:py-24 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Event Info Card */}
            {eventDetails && (
              <motion.div
                variants={itemVariants}
                className="bg-surface/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-border/50 mb-8"
              >
                <div className="flex flex-wrap md:flex-nowrap items-start justify-between gap-4 mb-6">
                  <div className="w-full md:w-auto">
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                    >
                      {eventDetails.title || 'Event Registration'}
                    </motion.h1>
                    {eventDetails.description && (
                      <p className="text-textSecondary text-base sm:text-lg whitespace-pre-line" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                        {eventDetails.description}
                      </p>
                    )}
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring" }}
                    className="flex-shrink-0 ml-auto"
                  >
                    <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-primary/20" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {eventDetails.date && (
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3 sm:p-4 bg-primary/5 rounded-xl border border-primary/20"
                    >
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-textSecondary uppercase tracking-wide">Date</p>
                        <p className="text-sm font-semibold text-text">
                          {new Date(eventDetails.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {eventDetails.venue && (
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3 sm:p-4 bg-secondary/5 rounded-xl border border-secondary/20"
                    >
                      <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-textSecondary uppercase tracking-wide">Venue</p>
                        <p className="text-sm font-semibold text-text">{eventDetails.venue}</p>
                      </div>
                    </motion.div>
                  )}
                  {eventDetails.venue_location && (
                    <motion.a
                      href={eventDetails.venue_location}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="flex items-center gap-3 p-3 sm:p-4 bg-accent/5 rounded-xl border border-accent/20 hover:bg-accent/10 transition-all duration-300 group"
                    >
                      <ExternalLink className="w-5 h-5 text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <p className="text-xs text-textSecondary uppercase tracking-wide">Location</p>
                        <p className="text-sm font-semibold text-text">View on Map</p>
                      </div>
                    </motion.a>
                  )}
                </div>

                {eventDetails.details && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-6 p-4 sm:p-6 bg-background/50 rounded-2xl border border-border/50"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-text mb-3">Event Details</h3>
                    <div 
                      className="text-textSecondary details-text prose prose-sm max-w-none whitespace-pre-line"
                      style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}
                      dangerouslySetInnerHTML={{ __html: eventDetails.details }} 
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Iframe Registration Form */}
            {eventDetails?.iframe ? (
              <motion.div
                variants={itemVariants}
                className="bg-surface/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl border border-border/50"
              >
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                    Registration Form
                  </h2>
                  <p className="text-textSecondary text-sm sm:text-base">Please fill out the form below to register for this event</p>
                </div>
                <div
                  className="iframe-container"
                  dangerouslySetInnerHTML={{ __html: eventDetails.iframe }}
                />
              </motion.div>
            ) : (
              <motion.div
                variants={itemVariants}
                className="bg-surface/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 text-center"
              >
                <p className="text-textSecondary text-lg">
                  Registration form will be available soon. Please check back later.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default EventRegistrationPage;
