import { ReactNode, createContext, useEffect, useState } from "react";
import { User } from "../services/Interfaces";
import { getUser, setUser } from "../auth/TokenManager";

interface UserData extends User {}

interface Props {
  children: ReactNode;
}

type UserContextType = {
  userData: UserData | null;
  setUserData: (data: UserData | null) => void;
};

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
});

export const UserProvider = ({ children }: Props) => {
  const userFromToken = getUser();
  useEffect(() => {
    setUserData(userFromToken ? userFromToken : null);
  }, []);
  const [userData, setUserData] = useState<UserData | null>(null);

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};
