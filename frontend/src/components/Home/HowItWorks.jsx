import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { motion } from "framer-motion";

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          How JobCloud Works
        </motion.h3>
        <div className="banner">
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="icon"><FaUserPlus /></div>
            <p>Create Account</p>
            <p>
              Sign up in minutes and create your professional profile to get started.
            </p>
          </motion.div>
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="icon"><MdFindInPage /></div>
            <p>Find or Post Jobs</p>
            <p>
              Browse thousands of jobs or post your requirements to find top talent.
            </p>
          </motion.div>
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="icon"><IoMdSend /></div>
            <p>Apply or Recruit</p>
            <p>
              Apply to your dream job or recruit the best candidates for your team.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
