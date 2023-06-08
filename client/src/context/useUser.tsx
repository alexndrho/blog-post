import { useContext } from 'react';
import { UserContext } from './UserProvider';

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) throw 'Missing UserProvider';

  return context;
};
