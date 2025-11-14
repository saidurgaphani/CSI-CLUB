'''use client';
import React from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-6xl md:text-8xl font-extrabold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Innovate. Connect. Inspire.
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
              className="text-textSecondary text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Your gateway to the world of Computer Science and Information
              Technology.
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
          </>
        }
      >
        <img
          src={`https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
'''