import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import axios from "axios";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const { user: clerkUser, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    const syncWithBackend = async () => {
      if (isLoaded && isSignedIn && clerkUser) {
        try {
          const userEmail = clerkUser.primaryEmailAddress?.emailAddress;
          const normalizedUserEmail = userEmail?.trim().toLowerCase();

          // Auto-assign role: Admin gets Employer, others get Job Seeker
          const role = normalizedUserEmail === "shlokg166@gmail.com" ? "Employer" : "Job Seeker";

          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/v1/user/clerk-sync`,
            {
              name: clerkUser.fullName || clerkUser.firstName,
              email: userEmail,
              phone: clerkUser.phoneNumbers?.[0]?.phoneNumber || "0",
              role: role,
            },
            {
              withCredentials: true,
              headers: { "Content-Type": "application/json" },
            }
          );

          setUser(response.data.user);
          setIsAuthorized(true);
        } catch (error) {
          console.error("Backend Sync Failed:", error);
          setIsAuthorized(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setIsAuthorized(false);
        setUser({});
      }
    };
    syncWithBackend();
  }, [isLoaded, isSignedIn, clerkUser]);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppWrapper />
    </ClerkProvider>
  </React.StrictMode>
);
