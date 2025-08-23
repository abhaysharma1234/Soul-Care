import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSign, setIsSign] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user && user.category === "admin") {
      setIsAdmin(true);
    }
  }, [user])
  

  const userInfo = (userData) => {
    setUser(userData);
    setIsSign(true)
  };
  
  const SignOut = () => {
    setUser(null);
    setIsSign(false)
    setIsAdmin(false);
  };

  const updatingScore = (symp,score)=>{
    console.log(symp,score)
  }

  return (
    <AuthContext.Provider value={{ user, userInfo, SignOut, isSign, isAdmin,updatingScore }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
