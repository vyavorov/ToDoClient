import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);

    const value = {
        authenticated,
        setAuthenticated,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export const useAuth = () => {
    return useContext(AuthContext);
};