import React from 'react';
import { useUserContext } from '../context/userContext';
import styled from 'styled-components';

type Props = {
  signOut: () => void;
};

const Login: React.FC<Props> = ({ signOut }) => {
  const user = useUserContext();
  return (
    <div>
      <Button onClick={signOut}>sign out</Button>
      {user && <p>{user.displayName}</p>}
    </div>
  );
};

const Button = styled.button`
  direction: ltr;
  font-weight: 500;
  height: auto;
  line-height: normal;
  max-width: 220px;
  min-height: 40px;
  padding: 8px 16px;
  text-align: left;
  width: 100%;
  background: hsla(0, 0%, 62%, 0.2);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  margin: 0 auto;
  background-color: #ffffff;
  border: none;
  border-radius: 2px;
  color: #000;
  min-width: 64px;
  display: inline-block;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  will-change: box-shadow;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1), background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: 0;
  cursor: pointer;
  text-decoration: none;
  vertical-align: middle;
`;

export default Login;
