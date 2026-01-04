import React, { useContext } from "react";
import { Context } from "../../context/Context.jsx";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By Job Cloud.</div>
      <div>
        <Link to="/" target="_blank">
          <FaFacebookF />
        </Link>
        <Link to="/" target="_blank">
          <FaYoutube />
        </Link>
        <Link to="/" target="_blank">
          <FaLinkedin />
        </Link>
        <Link to="/" target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
      <div style={{ fontSize: '10px', color: '#64748b', textAlign: 'center', width: '100%', marginTop: '10px' }}>
        API Connection: {import.meta.env.VITE_BACKEND_URL || "Localhost (Check Vercel Env)"}
      </div>
    </footer>
  );
};

export default Footer;
