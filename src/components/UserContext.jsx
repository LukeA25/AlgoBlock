import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth, database } from "../firebase";
import { ref, get, set } from "firebase/database";

const UserContext = createContext();

export function UserProvider(props) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  function saveUserDataToDatabase(user, username) {
    const userRef = ref(database, `userData/${user.uid}/loginData`);
    set(userRef, {
      email: user.email,
      username: username,
    })
      .then(() => {
        setUsername(username);
        console.log("User data saved successfully.");
      })
      .catch((error) => {
        console.error("Error saving user data:", error);
      });
  }

  function signup(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        saveUserDataToDatabase(userCredential.user, username);
        return userCredential;
      }
    );
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function usernameHandler(newUsername, setError) {
    setUsername(newUsername);
    try {
      setError("");
      const usernameRef = ref(
        database,
        `userData/${currentUser.uid}/loginData/username`
      );
      await set(usernameRef, newUsername);
    } catch (error) {
      setError("Error updating username");
      console.error(error);
    }
  }

  async function emailHandler(newEmail, setError) {
    try {
      setError("");
      await updateEmail(currentUser, newEmail);
      return newEmail;
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please logout and try again")
      } else {
        setError("Error updating email");
        console.error(error);
      }
    }
  }

  async function passwordHandler(newPassword, setError) {
    try {
      setError("");
      await updatePassword(currentUser, newPassword);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please logout and try again")
      } else {
        setError("Error updating password");
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        const usernameRef = ref(
          database,
          `userData/${user.uid}/loginData/username`
        );
        get(usernameRef).then((username) => {
          setUsername(username.val());
        });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    username,
    usernameHandler,
    emailHandler,
    passwordHandler,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && props.children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
export default UserContext;
