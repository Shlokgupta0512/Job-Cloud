import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { motion } from "framer-motion";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("http://localhost:4000/api/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications_page">
      <div className="page_hero">
        <img src="/my_applications_bg.png" alt="background" className="hero_bg" />
        <div className="overlay">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {user && user.role === "Job Seeker" ? "My Applications" : "Applications Management"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Manage and track your career progress details here.
          </motion.p>
        </div>
      </div>

      <div className="container">
        {user && user.role === "Job Seeker" ? (
          <motion.div
            className="cards_grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {applications.length <= 0 ? (
              <h4 className="no_data">No Applications Found</h4>
            ) : (
              applications.map((element, index) => {
                return (
                  <JobSeekerCard
                    element={element}
                    key={element._id}
                    index={index}
                    deleteApplication={deleteApplication}
                    openModal={openModal}
                  />
                );
              })
            )}
          </motion.div>
        ) : (
          <motion.div
            className="cards_grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {applications.length <= 0 ? (
              <h4 className="no_data">No Applications Found</h4>
            ) : (
              applications.map((element, index) => {
                return (
                  <EmployerCard
                    element={element}
                    key={element._id}
                    index={index}
                    openModal={openModal}
                  />
                );
              })
            )}
          </motion.div>
        )}
      </div>
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;

const JobSeekerCard = ({ element, deleteApplication, openModal, index }) => {
  return (
    <motion.div
      className="application_card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="card_header">
        <div className="user_info">
          <h3>{element.name}</h3>
          <p>{element.email}</p>
        </div>
        <div className="status_badge">
          Applied
        </div>
      </div>

      <div className="card_body">
        <div className="detail_row">
          <span>Phone:</span>
          <p>{element.phone}</p>
        </div>
        <div className="detail_row">
          <span>Address:</span>
          <p>{element.address}</p>
        </div>
        <div className="detail_row cover_letter">
          <span>Cover Letter:</span>
          <p>{element.coverLetter}</p>
        </div>
      </div>

      <div className="card_footer">
        <div className="resume_preview" onClick={() => openModal(element.resume.url)}>
          <img src={element.resume.url} alt="resume" />
          <div className="preview_overlay">View Resume</div>
        </div>
        <button className="delete_btn" onClick={() => deleteApplication(element._id)}>
          Delete Application
        </button>
      </div>
    </motion.div>
  );
};

const EmployerCard = ({ element, openModal, index }) => {
  return (
    <motion.div
      className="application_card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="card_header">
        <div className="user_info">
          <h3>{element.name}</h3>
          <p>{element.email}</p>
        </div>
        <div className="status_badge pending">
          New
        </div>
      </div>

      <div className="card_body">
        <div className="detail_row">
          <span>Phone:</span>
          <p>{element.phone}</p>
        </div>
        <div className="detail_row">
          <span>Address:</span>
          <p>{element.address}</p>
        </div>
        <div className="detail_row cover_letter">
          <span>Cover Letter:</span>
          <p>{element.coverLetter}</p>
        </div>
      </div>

      <div className="card_footer">
        <div className="resume_preview" onClick={() => openModal(element.resume.url)}>
          <img src={element.resume.url} alt="resume" />
          <div className="preview_overlay">View Resume</div>
        </div>
      </div>
    </motion.div>
  );
};
