import React from "react";
import { motion } from "framer-motion";

const Contact = () => {
    return (
        <section className="contactPage">
            <motion.div
                className="container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h3>Get in Touch</h3>
                <p>Have questions? We'd love to hear from you.</p>
                <div style={{ display: 'flex', gap: '50px', marginTop: '50px', textAlign: 'left', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <motion.div
                        style={{ flex: 1, minWidth: '300px' }}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4>Contact Information</h4>
                        <p style={{ marginTop: '20px' }}><strong>Email:</strong> support@jobcloud.com</p>
                        <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                        <p><strong>Address:</strong> 123 Job Street, Cloud City, JC 10101</p>
                    </motion.div>
                    <motion.div
                        style={{ flex: 1, minWidth: '300px' }}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <input type="text" placeholder="Your Name" />
                            <input type="email" placeholder="Your Email" />
                            <textarea placeholder="Your Message" rows="5"></textarea>
                            <button type="button">Send Message</button>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Contact;
