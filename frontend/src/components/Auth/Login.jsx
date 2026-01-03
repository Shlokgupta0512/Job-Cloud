import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <section className="authPage">
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <SignIn />
      </div>
    </section>
  );
};

export default Login;
