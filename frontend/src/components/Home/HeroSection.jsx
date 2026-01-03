import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <>
      <div className="heroSection">
        <div className="container">
          <motion.div
            className="title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Find Your <span className="highlight">Dream Job</span></h1>
            <h1>With <span className="highlight">Job Cloud</span></h1>
            <p>
              Discover thousands of job opportunities with top employers.
              Your future starts here. Join the community of professionals
              finding their perfect match every day.
            </p>
          </motion.div>
          <motion.div
            className="image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/hero_premium.png" alt="hero" />
          </motion.div>
        </div>
        <div className="details">
          {details.map((element, index) => {
            return (
              <motion.div
                className="card"
                key={element.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              >
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
