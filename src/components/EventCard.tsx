import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    date: string;
    venue: string;
    form_link: string;
    status: 'upcoming' | 'past';
    image: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const navigate = useNavigate();
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleRegisterClick = () => {
    navigate(`/register?eventId=${event.id}`);
  };

  return (
    <motion.div
      variants={cardVariants}
      className="bg-surface rounded-2xl shadow-lg overflow-hidden border border-border hover:shadow-primary/30 transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent"></div>
        <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          event.status === 'upcoming' ? 'bg-primary text-white' : 'bg-textSecondary/20 text-textSecondary'
        }`}>
          {event.status === 'upcoming' ? 'Upcoming' : 'Past'}
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-text text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-textSecondary text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        <div className="flex items-center text-textSecondary text-sm mb-2">
          <Calendar size={16} className="mr-2 text-accent" />
          <span>{formattedDate} at {formattedTime}</span>
        </div>
        <div className="flex items-center text-textSecondary text-sm mb-4">
          <MapPin size={16} className="mr-2 text-accent" />
          <span>{event.venue}</span>
        </div>
        {event.status === 'upcoming' && (
          <motion.button
            onClick={handleRegisterClick}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/80 transition-all duration-300 shadow-lg hover:shadow-primary/50"
            whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(158, 127, 255, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            Register Now
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;
