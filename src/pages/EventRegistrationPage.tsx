import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react'; // Import both icons
import { supabase } from '../supabaseClient';

interface EventDetail {
  id: string;
  title: string | null;
  description: string | null;
  date: string | null;
  venue: string | null;
  venue_location: string | null;
  iframe: string | null;
  details: string | null; // Add details to the interface
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
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3,
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
          .select('id, title, description, date, venue, venue_location, iframe, details') // Include details in the select
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
      navigate(-1); // Go back in history if possible
    } else {
      navigate('/'); // Otherwise, go to the home page
    }
  };

  if (loading) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-background text-text pt-20 flex flex-col items-center justify-center"
      >
        <button
          onClick={handleBack}
          className="absolute top-5 left-5 bg-surface hover:bg-surface/80 text-textSecondary font-semibold py-2 px-4 rounded-xl transition-colors duration-300"
        >
          <ArrowLeft className="inline-block mr-2" size={20} /> Back
        </button>
        <p>Loading event details...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen bg-background text-text pt-20 flex flex-col items-center justify-center"
      >
        <button
          onClick={handleBack}
          className="absolute top-5 left-5 bg-surface hover:bg-surface/80 text-textSecondary font-semibold py-2 px-4 rounded-xl transition-colors duration-300"
        >
          <ArrowLeft className="inline-block mr-2" size={20} /> Back
        </button>
        <p>Error: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="min-h-screen bg-background text-text pt-20 flex flex-col items-center justify-center"
    >
      <button
        onClick={handleBack}
        className="absolute top-5 left-5 bg-surface hover:bg-surface/80 text-textSecondary font-semibold py-2 px-4 rounded-xl transition-colors duration-300"
      >
        <ArrowLeft className="inline-block mr-2" size={20} /> Back
      </button>
      <div className="mx-4 px-4 py-6 bg-surface rounded-2xl shadow-md max-w-full"> {/* Added max-w-full */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{eventDetails?.title || 'Event Details'}</h1> {/* Responsive font size */}
        {eventDetails?.description && (
          <p className="text-lg mb-4">
            {eventDetails.description}
          </p>
        )}
        {eventDetails?.date && (
          <p className="text-lg mb-2">
            Date: {new Date(eventDetails.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        )}
        {eventDetails?.venue && eventDetails?.venue_location && (
          <p className="text-lg">
            Venue: <a href={eventDetails.venue_location} target="_self" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
              {eventDetails.venue}
              <ExternalLink size={16} className="ml-1" />
            </a>
          </p>
        )}
				{eventDetails?.details && ( // Render the details container
        <div className="mx-4 px-4 py-6 bg-surface rounded-2xl shadow-md mt-4">
          <h2 className="text-2xl font-semibold mb-2">Details</h2>
          <p className="text-lg details-text" style={{ whiteSpace: 'pre-line', lineHeight: '1.4' }} dangerouslySetInnerHTML={{ __html: eventDetails.details }} />
        </div>
      )}
      </div>
      
      {eventDetails?.iframe && (
        <div
          className="iframe-container w-full"  // Make iframe container responsive
          dangerouslySetInnerHTML={{ __html: eventDetails.iframe }}
        />
      )}
      {!eventDetails && (
        <p className="text-lg">
          No details available for this event.
        </p>
      )}
    </motion.div>
  );
};

export default EventRegistrationPage;
