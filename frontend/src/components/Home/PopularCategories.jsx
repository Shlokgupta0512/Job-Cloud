import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";
import { motion } from "framer-motion";

const PopularCategories = ({ selectedCategory, setSelectedCategory, jobs }) => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      icon: <MdOutlineDesignServices />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      icon: <TbAppsFilled />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      icon: <MdOutlineWebhook />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      icon: <FaReact />,
    },
    {
      id: 5,
      title: "Account & Finance",
      icon: <MdAccountBalance />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      icon: <GiArtificialIntelligence />,
    },
    {
      id: 7,
      title: "Video Animation",
      icon: <MdOutlineAnimation />,
    },
    {
      id: 8,
      title: "Game Development",
      icon: <IoGameController />,
    },
  ];

  const getJobCount = (categoryTitle) => {
    return jobs.filter(job => job.category === categoryTitle).length;
  };

  return (
    <div className="categories">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Explore Popular Categories
      </motion.h3>
      <div className="banner">
        {categories.map((element, index) => {
          const jobCount = getJobCount(element.title);
          const isActive = selectedCategory === element.title;

          return (
            <motion.div
              className={`card ${isActive ? "active" : ""}`}
              key={element.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedCategory(isActive ? "" : element.title)}
              style={{
                cursor: "pointer",
                border: isActive ? "2px solid #2d3436" : "2px solid transparent",
                transition: "all 0.3s ease"
              }}
            >
              <div className="icon">{element.icon}</div>
              <div className="text">
                <p>{element.title}</p>
                <p>{jobCount} Open {jobCount === 1 ? "Position" : "Positions"}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PopularCategories;
