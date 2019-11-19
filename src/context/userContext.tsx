import { createContext, useContext } from 'react';

export const User = createContext<Partial<User>>({});

export const useUserContext = () => {
  return useContext(User);
};
