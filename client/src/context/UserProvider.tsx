import { createContext, useState } from 'react';
import IUser from '../types/IUser';

interface IUserContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  userIcon: string;
  setUserIcon: (userIcon: string) => void;
}

const UserContext = createContext<IUserContext>({} as IUserContext);

interface Prop {
  children: React.ReactNode;
}

const UserProvider = ({ children }: Prop) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userIcon, setUserIcon] = useState<string>('');

  return (
    <UserContext.Provider value={{ user, setUser, userIcon, setUserIcon }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
export type { IUserContext };
