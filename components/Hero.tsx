"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./ui/Lamp";
import { HeroProps } from "../types";
import Image from "next/image";
import CountDown from "./CountDown";

const Hero: React.FC<HeroProps> = ({ id }) => {
  const [seconds, setSeconds] = useState(259200)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSeconds(0)
    }, 259200000)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <LampContainer className="pt-10 h-full">
      <motion.div id={id}
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-5xl z-50"
      >
        <p className="mt-10">
          {/* The lamp light, <br /> for all meme tokens */}
          Twitter  Followers Snapshot
        </p>
        <CountDown seconds={seconds} />
      </motion.div>
      <Image alt="null" src={'/image.png'} width={500} height={500} className="absolute  max-pn:mt-20" />

    </LampContainer>
  );
}

export default Hero