// check if user is logged in or not
import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    return (
        <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
            {children}
        </AuthContext.Provider>
    );
};