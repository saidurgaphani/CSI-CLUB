"use client";

// this is a client component
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { renderCanvas, ShineBorder, TypeWriter } from "./ui/hero-designali";
import { Plus, ArrowRight, UserPlus } from "lucide-react"; 
import { motion } from "framer-motion";

import { Button } from "./ui/button"; 

export const Hero = () => {
  const talkAbout = [
    "Building tech",
    "shaping minds",
    "inspiring innovation—together",
    "collaboration—unleashed",
    "Empowering minds",
    "building the future",
    
  ];

  useEffect(() => {
    renderCanvas();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1
      } 
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.3
      } 
    },
  };

  const plusIconVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4 + (i * 0.1)
      } 
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.8 + (i * 0.1)
      } 
    }),
  };

  return (
    <main className="overflow-hidden h-screen">
    <section id="home" className="h-full flex items-center justify-center">
   <div className="absolute inset-0 max-md:hidden top-[400px] -z-10 h-[400px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]"></div>
      <motion.div 
        className="flex flex-col items-center justify-center px-6 text-center lg:mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="mb-6 sm:justify-center md:mb-4"
          variants={badgeVariants}
        >
          <div className="relative flex items-center rounded-full border bg-popover px-3 py-1 text-xl text-primary/60">
            Introducing
            <h1
              className="ml-1 flex items-center font-semibold"
            >
              <div
                className="absolute inset-0 hover:font-semibold hover:text-ali flex"
                aria-hidden="true"
              />
              CSI Club <span aria-hidden="true"></span>
            </h1>
          </div>
        </motion.div>

        <motion.div 
          className="mx-auto max-w-5xl"
          variants={itemVariants}
        >
          <motion.div 
            className="border-text-red-500 relative mx-auto h-full bg-background border py-12 p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]"
            variants={headingVariants}
          >
            <h1 className="flex flex-col text-center text-5xl font-semibold leading-none tracking-tight md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
              <motion.div
                custom={0}
                variants={plusIconVariants}
                initial="hidden"
                animate="visible"
              >
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -left-5 -top-5 h-10 w-10"
                />
              </motion.div>
              <motion.div
                custom={1}
                variants={plusIconVariants}
                initial="hidden"
                animate="visible"
              >
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -bottom-5 -left-5 h-10 w-10"
                />
              </motion.div>
              <motion.div
                custom={2}
                variants={plusIconVariants}
                initial="hidden"
                animate="visible"
              >
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -right-5 -top-5 h-10 w-10"
                />
              </motion.div>
              <motion.div
                custom={3}
                variants={plusIconVariants}
                initial="hidden"
                animate="visible"
              >
                <Plus
                  strokeWidth={4}
                  className="text-text-red-500 absolute -bottom-5 -right-5 h-10 w-10"
                />
              </motion.div>
              <span>
                Your gateway to {" "}
                <span className="text-red-500">innovation.</span>
              </span>
            </h1>
            <motion.div 
              className="flex items-center mt-4 justify-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <span className="relative flex h-3 w-3 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <p className="text-xs font-semibold  text-green-500">Active event!</p>
            </motion.div>
          </motion.div>

          <motion.h1 
            className="mt-8 text-2xl md:text-2xl"
            variants={itemVariants}
          >
            Welcome to CSI Club! A community of{" "}
            <span className="text-red-500 font-bold">Creators, </span>
            <span className="text-red-500 font-bold">Learners, </span>
            and future {" "}
            <span className="text-red-500 font-bold">Tech leaders. </span>
          </motion.h1>

          <motion.p 
            className="text-primary/60 py-4"
            variants={itemVariants}
          >
            CSI Club: {" "}
            <span className="text-blue-500 font-semibold">
              <TypeWriter strings={talkAbout} />
            </span>.
          </motion.p>
          <motion.div 
            className="flex items-center justify-center gap-4 mt-5"
            variants={itemVariants}
          >
            <motion.div
              custom={0}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <Link to="/events">
                <ShineBorder
                  borderWidth={3}
                  className="border cursor-pointer h-auto w-auto p-2 bg-white/5 backdrop-blur-md dark:bg-black/5"
                  color={["#FF007F", "#39FF14", "#00FFFF"]}
                >
                  <Button className="w-full rounded-xl" >
                    View events <ArrowRight className="ml-2" size={20} />
                  </Button>
                </ShineBorder>
              </Link>
            </motion.div>
            <motion.div
              custom={1}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <Link to={"/join"}>
                <Button size="lg" className="rounded-xl bg-gray-200 text-black hover:bg-gray-300">
                  Join in club <UserPlus className="ml-2" size={20} />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
      <canvas
        className="pointer-events-none absolute inset-0 mx-auto"
        id="canvas"
      ></canvas>
    </section>
     </main>
  );
};
