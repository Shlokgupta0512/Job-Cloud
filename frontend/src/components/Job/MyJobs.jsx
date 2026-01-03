import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MdTitle,
  MdPublic,
  MdLocationCity,
  MdCategory,
  MdAttachMoney,
  MdHistory,
  MdDescription,
  MdLocationOn,
  MdWorkHistory
} from "react-icons/md";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:4000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:4000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <section className="my_jobs_page">
      <div className="page_hero">
        <img src="/my_jobs_bg.png" alt="background" className="hero_bg" />
        <div className="overlay">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero_content"
          >
            <MdWorkHistory className="hero_icon" />
            <h1>Manage Your Postings</h1>
            <p>Track, edit, and optimize your job listings for better talent reach.</p>
          </motion.div>
        </div>
      </div>

      <div className="container">
        {myJobs.length > 0 ? (
          <div className="jobs_grid">
            {myJobs.map((element, index) => (
              <motion.div
                className={`job_card ${editingMode === element._id ? "editing" : ""}`}
                key={element._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="card_header">
                  <div className="title_wrapper">
                    <MdTitle className="card_icon" />
                    <input
                      type="text"
                      disabled={editingMode !== element._id}
                      value={element.title}
                      className="premium_input title_input"
                      onChange={(e) => handleInputChange(element._id, "title", e.target.value)}
                    />
                  </div>
                  <div className="action_buttons">
                    {editingMode === element._id ? (
                      <>
                        <button onClick={() => handleUpdateJob(element._id)} className="save_btn">
                          <FaCheck />
                        </button>
                        <button onClick={() => handleDisableEdit()} className="cancel_btn">
                          <RxCross2 />
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleEnableEdit(element._id)} className="edit_btn">
                        Edit Listing
                      </button>
                    )}
                    <button onClick={() => handleDeleteJob(element._id)} className="delete_btn">
                      Delete
                    </button>
                  </div>
                </div>

                <div className="card_body">
                  <div className="grid_fields">
                    <div className="input_group">
                      <label><MdPublic /> Country</label>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        className="premium_input"
                        onChange={(e) => handleInputChange(element._id, "country", e.target.value)}
                      />
                    </div>
                    <div className="input_group">
                      <label><MdLocationCity /> City</label>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        className="premium_input"
                        onChange={(e) => handleInputChange(element._id, "city", e.target.value)}
                      />
                    </div>
                    <div className="input_group">
                      <label><MdCategory /> Category</label>
                      <select
                        value={element.category}
                        className="premium_input"
                        onChange={(e) => handleInputChange(element._id, "category", e.target.value)}
                        disabled={editingMode !== element._id}
                      >
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN Stack Development">MERN STACK Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">MEAN STACK Development</option>
                        <option value="MEVN Stack Development">MEVN STACK Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                      </select>
                    </div>
                    <div className="input_group">
                      <label><MdHistory /> Status</label>
                      <select
                        value={element.expired}
                        className="premium_input"
                        onChange={(e) => handleInputChange(element._id, "expired", e.target.value)}
                        disabled={editingMode !== element._id}
                      >
                        <option value={false}>Active</option>
                        <option value={true}>Expired</option>
                      </select>
                    </div>
                  </div>

                  <div className="salary_section">
                    <label><MdAttachMoney /> Salary Configuration</label>
                    <div className="salary_inputs">
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          className="premium_input"
                          onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)}
                          placeholder="Fixed Salary"
                        />
                      ) : (
                        <div className="range_inputs">
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            className="premium_input"
                            onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)}
                            placeholder="From"
                          />
                          <span>to</span>
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            className="premium_input"
                            onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)}
                            placeholder="To"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text_fields">
                    <div className="input_group">
                      <label><MdDescription /> Description</label>
                      <textarea
                        rows={4}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        className="premium_input"
                        onChange={(e) => handleInputChange(element._id, "description", e.target.value)}
                      />
                    </div>
                    <div className="input_group">
                      <label><MdLocationOn /> Precise Location</label>
                      <textarea
                        value={element.location}
                        rows={3}
                        disabled={editingMode !== element._id}
                        className="premium_input"
                        onChange={(e) => handleInputChange(element._id, "location", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="no_jobs">
            <MdWorkHistory className="empty_icon" />
            <p>You haven't posted any jobs yet. Start building your team today!</p>
            <button onClick={() => navigateTo("/job/post")} className="post_btn">Post a New Job</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyJobs;
