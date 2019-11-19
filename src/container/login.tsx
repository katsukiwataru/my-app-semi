import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import { User } from '../context/userContext';
import LoginComonents from '../components/login';

const Login: React.FC = () => {
  const [user, setUser] = useState();

  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const signOut = () => {
    firebase.auth().signOut();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <User.Provider value={user}>
      <LoginComonents signIn={signIn} signOut={signOut} />
    </User.Provider>
  );
};

export default Login;
