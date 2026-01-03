import React, { useContext, useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import PopularCategories from "../Home/PopularCategories";
import { motion } from "framer-motion";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  const resultsRef = useRef(null);

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/v1/job/getall`, {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useLayoutEffect(() => {
    if (selectedCategory && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedCategory]);

  return (
    <section className="jobsPage">
      <div className="jobsHero">
        <motion.div
          className="heroContent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src="/jobs_hero.png" alt="Jobs Hero" className="heroImage" />
          <div className="overlay">
            <h1>Explore All <span className="highlight">Available Jobs</span></h1>
            <p>Find your next career opportunity in the tech world.</p>
          </div>
        </motion.div>
      </div>

      <PopularCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        jobs={jobs.jobs || []}
      />

      <div className="container">
        <motion.h3
          ref={resultsRef}
          className="sectionTitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "15px",
            justifyContent: selectedCategory ? "flex-start" : "center"
          }}
        >
          {selectedCategory ? `${selectedCategory} Jobs` : "Latest Job Openings"}
          {selectedCategory && (
            <button
              className="clearFilterBtn"
              onClick={() => setSelectedCategory("")}
              style={{
                marginLeft: "20px",
                padding: "5px 15px",
                fontSize: "14px",
                cursor: "pointer",
                borderRadius: "5px",
                border: "1px solid #ccc",
                background: "#f9f9f9"
              }}
            >
              Clear Filter
            </button>
          )}
        </motion.h3>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs
              .filter(job => !selectedCategory || job.category === selectedCategory)
              .map((element, index) => {
                return (
                  <motion.div
                    className="card"
                    key={element._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="title">{element.title}</p>
                    <p className="category">{element.category}</p>
                    <p className="country">{element.country}</p>
                    <Link to={`/job/${element._id}`}>View Details</Link>
                  </motion.div>
                );
              })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
