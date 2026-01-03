import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import Application from "../Application/Application";
import { motion } from "framer-motion";
import {
  MdCategory,
  MdLocationOn,
  MdDescription,
  MdCalendarToday,
  MdAttachMoney,
  MdWork
} from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, []);

  return (
    <section className="job_details_page">
      <div className="page_hero">
        <img src="/job_details_bg.png" alt="background" className="hero_bg" />
        <div className="overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="hero_content"
          >
            <MdWork className="hero_icon" />
            <h1>{job.title}</h1>
            <p><HiOutlineOfficeBuilding /> {job.category}</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        <div className="details_wrapper">
          <motion.div
            className="main_info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info_card description">
              <div className="card_header">
                <MdDescription />
                <h4>Job Description</h4>
              </div>
              <p>{job.description}</p>
            </div>

            <div className="info_grid">
              <div className="info_card">
                <div className="card_header">
                  <MdLocationOn />
                  <h4>Location</h4>
                </div>
                <p>{job.city}, {job.country}</p>
                <span className="sub_text">{job.location}</span>
              </div>

              <div className="info_card">
                <div className="card_header">
                  <MdAttachMoney />
                  <h4>Salary Package</h4>
                </div>
                <p>
                  {job.fixedSalary ? (
                    `₹${job.fixedSalary}`
                  ) : (
                    `₹${job.salaryFrom} - ₹${job.salaryTo}`
                  )}
                </p>
                <span className="sub_text">Monthly (Gross)</span>
              </div>

              <div className="info_card">
                <div className="card_header">
                  <MdCalendarToday />
                  <h4>Posted On</h4>
                </div>
                <p>{new Date(job.jobPostedOn).toLocaleDateString()}</p>
                <span className="sub_text">Reference ID: {job._id?.slice(-6)}</span>
              </div>

              <div className="info_card">
                <div className="card_header">
                  <MdCategory />
                  <h4>Category</h4>
                </div>
                <p>{job.category}</p>
                <span className="sub_text">Full-Time Position</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="application_section"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {user && user.role === "Employer" ? (
              <div className="employer_note">
                <p>You are viewing this job as an employer.</p>
              </div>
            ) : (
              <Application jobId={job._id} />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
