import React from "react";
import { FaMicrosoft, FaApple, FaGoogle, FaAmazon, FaFacebook } from "react-icons/fa";
import { SiTesla, SiNetflix } from "react-icons/si";
import { motion } from "framer-motion";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Redmond, WA",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Austin, TX",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Cupertino, CA",
      openPositions: 20,
      icon: <FaApple />,
    },
    {
      id: 4,
      title: "Google",
      location: "Mountain View, CA",
      openPositions: 15,
      icon: <FaGoogle />,
    },
    {
      id: 5,
      title: "Amazon",
      location: "Seattle, WA",
      openPositions: 25,
      icon: <FaAmazon />,
    },
    {
      id: 6,
      title: "Meta",
      location: "Menlo Park, CA",
      openPositions: 12,
      icon: <FaFacebook />,
    },
    {
      id: 7,
      title: "Netflix",
      location: "Los Gatos, CA",
      openPositions: 8,
      icon: <SiNetflix />,
    },
  ];
  return (
    <div className="companies">
      <div className="container">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Trusted by Top Companies
        </motion.h3>
        <div className="banner">
          {companies.map((element, index) => {
            return (
              <motion.div
                className="card"
                key={element.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="content">
                  <div className="icon">{element.icon}</div>
                  <div className="text">
                    <p>{element.title}</p>
                    <p>{element.location}</p>
                  </div>
                </div>
                <button>Open Positions {element.openPositions}</button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
