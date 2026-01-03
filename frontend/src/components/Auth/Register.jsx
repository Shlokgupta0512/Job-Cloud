import React from "react";
import { SignUp } from "@clerk/clerk-react";

const Register = () => {
  return (
    <section className="authPage">
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <SignUp />
      </div>
    </section>
  );
};

export default Register;
