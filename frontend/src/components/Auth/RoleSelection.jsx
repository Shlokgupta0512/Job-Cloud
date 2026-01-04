import React from "react";
import { motion } from "framer-motion";
import { FaUserTie, FaUserAstronaut } from "react-icons/fa";

const RoleSelection = ({ onSelect }) => {
    return (
        <div className="role-selection-overlay">
            <motion.div
                className="role-selection-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Select Your Role</h2>
                <p>How would you like to use Job Cloud?</p>

                <div className="roles-grid">
                    <motion.div
                        className="role-card"
                        whileHover={{ scale: 1.05, borderColor: "#2d3436" }}
                        onClick={() => onSelect("Job Seeker")}
                    >
                        <FaUserAstronaut className="role-icon" />
                        <h3>Job Seeker</h3>
                        <p>Find your dream job and apply to top companies.</p>
                    </motion.div>

                    <motion.div
                        className="role-card"
                        whileHover={{ scale: 1.05, borderColor: "#2d3436" }}
                        onClick={() => onSelect("Employer")}
                    >
                        <FaUserTie className="role-icon" />
                        <h3>Employer</h3>
                        <p>Post job openings and hire the best talent.</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default RoleSelection;
