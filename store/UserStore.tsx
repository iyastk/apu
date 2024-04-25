"use client";
// Create a new Context
import React, { createContext, useState, useContext, useEffect } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, onAuthStateChangedListener, signOutAuthUser } from "@/utils/firebase";
import { User } from "firebase/auth";

interface UserContext {
  currentUser:User| null | string;
  setCurrentUser: (newData: string) => void;
}

// Creating a context with default value
export const UserContext = createContext<UserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

// Create a provider for components to consume and update the context
export const UserContextProvider = ({ children }: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<|User|string | null>(null);

  // const updateData = (user: any) => {
  //   setCurrentUser(user);
  // };
  useEffect(() => {
    const unSubscribe = onAuthStateChangedListener((user) => {
      if(user){
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user);
    });
    return unSubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
