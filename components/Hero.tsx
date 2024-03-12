"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/Lamp";
import { HeroProps } from "../types";

const Hero: React.FC<HeroProps> = ({id}) => {
  return (
    <LampContainer>
      <motion.h1
      id={id}
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl z-50"
      >
        The lamp light, <br /> for all meme tokens
      </motion.h1>
    </LampContainer>
  );
}

export default Hero