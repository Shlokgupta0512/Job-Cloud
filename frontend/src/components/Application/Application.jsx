import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { motion } from "framer-motion";
import {
  MdPerson,
  MdEmail,
  MdPhone,
  MdLocationCity,
  MdDescription,
  MdFileUpload
} from "react-icons/md";

const Application = ({ jobId: propJobId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id: paramId } = useParams();
  const id = propJobId || paramId;

  const handleApplication = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/v1/application/post`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (user && user.role === "Employer") {
    return null;
  }

  if (!isAuthorized) {
    return (
      <div className="login_prompt_card">
        <h3>Ready to take the next step?</h3>
        <p>Login as a Job Seeker to apply for this position.</p>
        <button onClick={() => navigateTo("/login")} className="login_btn">
          Login to Apply
        </button>
      </div>
    );
  }

  return (
    <div className="premium_application_form">
      <h3>Quick Application</h3>
      <p>Submit your details to express interest in this role.</p>

      <form onSubmit={handleApplication}>
        <div className="input_wrapper">
          <MdPerson className="input_icon" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="input_wrapper">
          <MdEmail className="input_icon" />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid_inputs">
          <div className="input_wrapper">
            <MdPhone className="input_icon" />
            <input
              type="number"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input_wrapper">
            <MdLocationCity className="input_icon" />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input_wrapper textarea_wrapper">
          <MdDescription className="input_icon" />
          <textarea
            placeholder="Tell us why you are a good fit (Cover Letter)..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>

        <div className="file_upload_wrapper">
          <label htmlFor="resume_upload" className="file_label">
            <MdFileUpload />
            <span>{resume ? resume.name : "Upload Resume (PDF, JPG, PNG)"}</span>
          </label>
          <input
            id="resume_upload"
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={handleFileChange}
            hidden
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="submit_btn"
        >
          Submit Application
        </motion.button>
      </form>
    </div>
  );
};

export default Application;
