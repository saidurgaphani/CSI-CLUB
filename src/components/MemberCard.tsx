import React from 'react';
import { motion } from 'framer-motion';
import { Member } from '../hooks/useSupabaseData';

interface MemberCardProps {
  member: Member;
}

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-surface rounded-2xl shadow-xl overflow-hidden border border-border p-6 text-center transform hover:scale-105 transition-all duration-300 group"
    >
      <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary group-hover:border-secondary transition-colors duration-300">
        <img
          src={member.image_url || 'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-2">
          <span className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-primary transition-colors duration-300">
        {member.name}
      </h3>
      <p className="text-textSecondary text-lg font-medium group-hover:text-accent transition-colors duration-300">
        {member.role}
      </p>
    </motion.div>
  );
};

export default MemberCard;
