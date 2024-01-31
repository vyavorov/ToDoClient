import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setAuthenticated(true);
        }
    }, []);

    const value = {
        authenticated,
        setAuthenticated,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};