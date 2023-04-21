import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider(props) {
  const [userKey, setUserKey] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{userKey, setUserKey, isLoggedIn, setIsLoggedIn}}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;