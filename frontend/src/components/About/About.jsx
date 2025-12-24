import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="aboutPage">
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3>About Job Cloud</h3>
        <p style={{ maxWidth: '800px', margin: '0 auto' }}>
          Job Cloud is the leading platform for connecting world-class talent with top-tier employers.
          We are dedicated to bridging the gap between potential and opportunity, making the job search
          process seamless, efficient, and empowering for everyone.
        </p>

        <div className="about-grid">
          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Our Mission</h4>
            <p>To empower individuals to find their dream careers and help companies build world-class teams. We believe in the power of connection and the potential of every individual to make a difference.</p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Our Vision</h4>
            <p>To be the world's most trusted and innovative employment marketplace, creating a future where every person has access to meaningful work and every business can find the talent they need to thrive.</p>
          </motion.div>

          <motion.div
            className="about-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4>Our Values</h4>
            <p>Integrity, Innovation, and Inclusivity. We are committed to creating a platform that is fair, transparent, and accessible to all, fostering a community built on trust and mutual success.</p>
          </motion.div>
        </div>

        <motion.div
          style={{ marginTop: '80px', textAlign: 'left' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 style={{ fontSize: '2rem', textAlign: 'center' }}>Why Choose Us?</h3>
          <div className="about-grid" style={{ marginTop: '40px' }}>
            <div className="about-card">
              <h4>For Job Seekers</h4>
              <p>Access thousands of verified jobs, smart matching algorithms, and career resources designed to help you stand out and succeed.</p>
            </div>
            <div className="about-card">
              <h4>For Employers</h4>
              <p>Streamlined recruitment tools, access to a diverse talent pool, and data-driven insights to help you hire the best candidates faster.</p>
            </div>
            <div className="about-card">
              <h4>24/7 Support</h4>
              <p>Our dedicated support team is always here to assist you, ensuring a smooth and hassle-free experience on our platform.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
