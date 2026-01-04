import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider, useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";
import RoleSelection from "./components/Auth/RoleSelection";
import "./App.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState({});
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user: clerkUser, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  const syncUser = async (selectedRole) => {
    if (!clerkUser) return;
    setLoading(true);

    const userEmail = clerkUser.primaryEmailAddress?.emailAddress;
    const normalizedUserEmail = userEmail?.trim().toLowerCase();

    // Auto-promote admin
    const role = (normalizedUserEmail === "shlokg166@gmail.com") ? "Employer" : selectedRole;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/v1/user/clerk-sync`,
        {
          name: clerkUser.fullName || clerkUser.firstName,
          email: userEmail,
          role: role,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Backend Sync Successful:", response.data);
      setIsAuthorized(true);
      setUser(response.data.user);
      setShowRoleSelection(false);
    } catch (error) {
      console.error("Backend Sync Failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoaded && isSignedIn && clerkUser) {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"}/api/v1/user/getuser`,
            { withCredentials: true }
          );
          if (data.user && data.user.role) {
            setUser(data.user);
            setIsAuthorized(true);
            setShowRoleSelection(false);
          } else {
            setShowRoleSelection(true);
          }
        } catch (error) {
          setShowRoleSelection(true);
        } finally {
          setLoading(false);
        }
      } else if (isLoaded && !isSignedIn) {
        setIsAuthorized(false);
        setUser({});
        setShowRoleSelection(false);
        setLoading(false);
      }
    };
    fetchUser();
  }, [isLoaded, isSignedIn, clerkUser]);

  if (loading && !showRoleSelection && isSignedIn) {
    return <div className="loading-screen"><h3>Loading User Profile...</h3></div>;
  }

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      {showRoleSelection && <RoleSelection onSelect={syncUser} />}
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
