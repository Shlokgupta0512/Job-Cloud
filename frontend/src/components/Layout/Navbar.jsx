import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { user } = useContext(Context);
  const { isSignedIn } = useUser();

  return (
    <nav className="navbarShow">
      <div className="container">
        <div className="logo">
          <h3 style={{ color: 'white' }}>Job Cloud</h3>
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/contact"} onClick={() => setShow(false)}>
              CONTACT
            </Link>
          </li>
          <li>
            <Link to={"/about"} onClick={() => setShow(false)}>
              ABOUT US
            </Link>
          </li>
          {isSignedIn && (
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(false)}>
                {user && user.role === "Employer"
                  ? "APPLICANT'S APPLICATIONS"
                  : "MY APPLICATIONS"}
              </Link>
            </li>
          )}
          {isSignedIn && user && user.role === "Employer" ? (
            <li className="dropdown-container">
              <span className="dropdown-trigger">EMPLOYER PANEL</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to={"/job/post"} onClick={() => setShow(false)}>
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to={"/job/me"} onClick={() => setShow(false)}>
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </ul>
            </li>
          ) : (
            <></>
          )}

          <li onClick={() => setShow(false)}>
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="nav-login-btn">LOGIN</button>
              </SignInButton>
            )}
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
