import React from 'react';
import { useUserContext } from '../context/userContext';

type Props = {
  signIn: () => void;
  signOut: () => void;
};

const Login: React.FC<Props> = ({ signIn, signOut }) => {
  const user = useUserContext();
  console.log(user);
  return (
    <div>
      <button onClick={signIn}>sign in</button>
      <button onClick={signOut}>sign out</button>
      {user && <p>{user.displayName}</p>}
    </div>
  );
};

export default Login;
