import React, { useEffect, createContext, useContext, FC, useState, useMemo } from 'react';
import firebase from '../firebase';

interface UserState {
  user: User | null;
  signOut: () => void;
}

const useUserContext = () => useContext(useUserContext.context);
useUserContext.context = createContext<UserState>({ user: null, signOut: () => {} });

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    console.log('In Effect');
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user as User);
    });
  }, [user]);

  const value = useMemo<UserState>(() => {
    console.log('In Memo');
    return { signOut, user };
  }, [user]);

  return <useUserContext.context.Provider value={value} children={children} />;
};

export default useUserContext;
