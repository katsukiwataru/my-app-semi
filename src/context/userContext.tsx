import React, { useEffect, createContext, useContext, FC, useState, useMemo } from 'react';
import firebase, { firestore } from '../firebase';

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

  const addUser = async () => {
    if (user) {
      try {
        await firestore
          .collection('user')
          .doc(`${user.uid}`)
          .set({
            name: user.displayName,
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // console.log(user);
    addUser();
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user as User);
    });
  }, [user]);

  const value = useMemo<UserState>(() => {
    return { signOut, user };
  }, [user]);

  return <useUserContext.context.Provider value={value} children={children} />;
};

export default useUserContext;
