import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider, useUser, useAuth } from "@clerk/clerk-react";
import axios from "axios";

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
  const { user: clerkUser, isLoaded } = useUser();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const syncWithBackend = async () => {
      if (isLoaded && isSignedIn && clerkUser) {
        try {
          const userEmail = clerkUser.primaryEmailAddress?.emailAddress;
          console.log("Clerk User Email:", userEmail);
          console.log("Env ADMIN_EMAIL:", ADMIN_EMAIL);

          const role = userEmail?.toLowerCase() === ADMIN_EMAIL?.toLowerCase() ? "Employer" : "Job Seeker";

          console.log(`Syncing user: ${userEmail}, assigned role: ${role}`);

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
          console.log("Backend Sync Successful:", response.data);
          setIsAuthorized(true);
          setUser({ ...response.data.user, role });
        } catch (error) {
          console.error("Backend Sync Failed:", error);
          setIsAuthorized(false);
        }
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
