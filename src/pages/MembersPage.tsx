import React from 'react';
import { motion } from 'framer-motion';
import { useSupabaseData } from '../hooks/useSupabaseData';
import MemberCard from '../components/MemberCard';
import { Parallax, ParallaxImage, ParallaxSection } from '../components/Parallax';

const MembersPage: React.FC = () => {
  const { members, loading, error } = useSupabaseData();

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
        <p className="text-xl text-textSecondary">Loading club members...</p>
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

  const facultyMembers = members.filter(member => member.type === 'faculty');
  const studentMembers = members.filter(member => member.type === 'student');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background text-text pt-14"
    >
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <ParallaxImage
          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Team Collaboration"
          speed={0.9}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10"></div>
        <div className="relative z-20 p-4 max-w-4xl mx-auto">
          <Parallax speed={1.0} direction="up">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-7xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Our Visionary Team
            </motion.h1>
          </Parallax>
          <Parallax speed={0.8} direction="up">
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="text-textSecondary text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Meet the dedicated individuals driving innovation and community within our club.
            </motion.p>
          </Parallax>
        </div>
      </section>

      {/* Faculty Coordinators Section */}
      <ParallaxSection className="container mx-auto px-4 py-16 md:py-24" speed={0.5}>
        <Parallax speed={0.7} direction="up">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">
              Faculty Coordinators
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed">
              Our esteemed faculty members who guide and inspire us.
            </p>
          </motion.div>
        </Parallax>

        <Parallax speed={0.9} direction="up">
          {facultyMembers.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12"
            >
              {facultyMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          ) : (
            <motion.p variants={itemVariants} className="text-center text-textSecondary text-xl py-10">
              No faculty members found.
            </motion.p>
          )}
        </Parallax>
      </ParallaxSection>

      {/* Student Coordinators Section */}
      <ParallaxSection className="container mx-auto px-4 py-16 md:py-24 bg-surface rounded-3xl shadow-2xl my-16" speed={0.5}>
        <Parallax speed={0.7} direction="up">
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Student Coordinators
            </h2>
            <p className="text-textSecondary text-lg leading-relaxed">
              The passionate students leading our initiatives and events.
            </p>
          </motion.div>
        </Parallax>

        <Parallax speed={0.9} direction="up">
          {studentMembers.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12"
            >
              {studentMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </motion.div>
          ) : (
            <motion.p variants={itemVariants} className="text-center text-textSecondary text-xl py-10">
              No student members found.
            </motion.p>
          )}
        </Parallax>
      </ParallaxSection>
    </motion.div>
  );
};

export default MembersPage;
