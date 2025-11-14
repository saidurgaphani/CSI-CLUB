import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { memberBenefits } from '../constants';
import { motion } from 'framer-motion';
import { useSupabaseData } from '../hooks/useSupabaseData';
import { Parallax, ParallaxImage, ParallaxSection } from '../components/Parallax';

const JoinPage: React.FC = () => {
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
        <p className="text-xl text-textSecondary">Loading club data...</p>
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
        className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-accent/20 to-primary/20"
      >
        <ParallaxImage
          src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Join Club"
          speed={0.8}
        />
        <div className="absolute inset-0 bg-background/60 z-10"></div>
        <div className="relative z-20 text-center">
          <Parallax speed={0.9} direction="up">
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary mb-4"
            >
              Become a Member
            </motion.h1>
          </Parallax>
          <Parallax speed={0.7} direction="up">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto"
            >
              Unlock your potential and connect with a community of tech enthusiasts.
            </motion.p>
          </Parallax>
        </div>
      </motion.section>

      <ParallaxSection className="container mx-auto px-4 py-16" speed={0.5}>
        {/* Benefits Section */}
        <Parallax speed={0.7} direction="up">
          <motion.section variants={itemVariants} className="mb-16 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Why Join the CSI Club?
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed mb-12">
              Joining our club opens doors to unparalleled opportunities for learning, networking, and personal growth in the dynamic field of Computer Science.
            </p>
          </motion.section>
        </Parallax>
        <Parallax speed={0.8} direction="up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memberBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-surface rounded-2xl p-6 shadow-lg border border-border flex items-start gap-4 hover:shadow-primary/30 transition-all duration-300"
              >
                <CheckCircle size={24} className="text-primary flex-shrink-0 mt-1" />
                <p className="text-text text-lg font-medium text-left">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </Parallax>

        {/* Call to Action */}
        <Parallax speed={0.6} direction="up">
          <motion.section variants={itemVariants} className="text-center bg-surface rounded-3xl p-10 md:p-16 shadow-2xl border border-border max-w-3xl mx-auto mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-6 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">
              Ready to Make an Impact?
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed mb-8">
              Becoming a member is simple! Click the button below to fill out our membership form and start your journey with the CSI Club.
            </p>
            <motion.a
              href={clubSettings?.join_form_link || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 bg-primary text-white font-bold rounded-xl text-xl shadow-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 hover:shadow-primary/50"
              whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(158, 127, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Join the Club Now <ArrowRight className="ml-3" size={24} />
            </motion.a>
          </motion.section>
        </Parallax>
      </ParallaxSection>
    </motion.div>
  );
};

export default JoinPage;
