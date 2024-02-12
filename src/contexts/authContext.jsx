import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeJwt } from '../helpers/jwtHelper';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decodedToken = decodeJwt(storedToken);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem('token');
                setAuthenticated(false);
            }
            else {
                setAuthenticated(true);
            }
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