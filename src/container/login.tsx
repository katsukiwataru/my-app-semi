import React, { useState, useEffect } from 'react';
import firebase from '../firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { User } from '../context/userContext';
import Header from '../components/page';

const Login: React.FC = () => {
  const [user, setUser] = useState();
  const uiConfig = {
    signInSuccessUrl: '/',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.TwitterAuthProvider.PROVIDER_ID],
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
      {user && (
        <div>
          <Header signOut={signOut} />
        </div>
      )}
      {!user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />}
    </User.Provider>
  );
};

export default Login;
