'use client'

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { MobileNav } from "../constants";

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

const MobileNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="menu w-full top-0 right-0"
    >
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-3 text-xl mt-3"
      >
        Menu
        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55 }}
        >
          <svg width="15" height="15" viewBox="0 0 20 20">
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.button>
      <motion.ul
        variants={{
          open: {
            clipPath: "inset(0% 0% 0% 0% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.7,
              delayChildren: 0.3,
              staggerChildren: 0.05
            },
          },
          closed: {
            clipPath: "inset(10% 50% 90% 50% round 10px)",
            transition: {
              type: "spring",
              bounce: 0,
              duration: 0.3
            }
          }
        }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        className="flex flex-col bg-whiteRabbit dark:bg-base-200 p-5 z-10"
      >
        {
          MobileNav.map((item: any, index: number) => (
            item.name === 'Home' ?
              <motion.li className="text-xl text-black dark:text-whiteRabbit" variants={itemVariants} key={index}  >
                <Link href={item.link}>{item.name} </Link>
              </motion.li>
              :
              <motion.li className="text-xl text-grey dark:text-white" variants={itemVariants} key={index} >
                <Link href={item.link}>{item.name} </Link>
              </motion.li>
          ))
        }
      </motion.ul>
    </motion.nav>
  );
}

export default MobileNavBar