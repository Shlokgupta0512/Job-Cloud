import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ClerkProvider, useUser, useAuth } from "@clerk/clerk-react";

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
    if (isLoaded) {
      if (isSignedIn && clerkUser) {
        setIsAuthorized(true);
        const userEmail = clerkUser.primaryEmailAddress?.emailAddress;
        const role = userEmail === ADMIN_EMAIL ? "Employer" : "Job Seeker";
        setUser({
          ...clerkUser,
          role: role,
          _id: clerkUser.id, // Mapping Clerk ID to _id for compatibility
        });
      } else {
        setIsAuthorized(false);
        setUser({});
      }
    }
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
