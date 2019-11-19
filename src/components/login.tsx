import React from 'react';
import { useUserContext } from '../context/userContext';

type Props = {
  signOut: () => void;
};

const Login: React.FC<Props> = ({ signOut }) => {
  const user = useUserContext();
  console.log(user);
  return (
    <div>
      <button onClick={signOut}>sign out</button>
      {user && <p>{user.displayName}</p>}
    </div>
  );
};

export default Login;
