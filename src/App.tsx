import React from 'react';
import firebase from './firebase';

const App: React.FC = () => {
  const login = () => {
    console.log(firebase);
  };
  login();

  return (
    <>
      <div>
        <p>aa</p>
      </div>
    </>
  );
};

export default App;
