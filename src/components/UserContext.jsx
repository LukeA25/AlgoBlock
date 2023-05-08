import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider(props) {
  const [userKey, setUserKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStrategy, setCurrentStrategy] = useState("");

  return (
    <UserContext.Provider value={{userKey, setUserKey, isLoggedIn, setIsLoggedIn, currentStrategy, setCurrentStrategy}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;