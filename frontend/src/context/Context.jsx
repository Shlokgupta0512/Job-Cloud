import { createContext } from "react";

export const Context = createContext({
    isAuthorized: false,
    setIsAuthorized: () => { },
    user: {},
    setUser: () => { },
});
