/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebase';
const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [googleAccessToken, setGoogleAccessToken] = useState(null);
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    setGoogleAccessToken(null);
    return signOut(auth);
  };
  const signin = (email, password) => {
    setGoogleAccessToken(null);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signinWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setGoogleAccessToken(token);
        return result;
      })
      .catch((error) => {
        console.error('Error during Google sign-in:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setGoogleAccessToken(null);
      }
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        logout,
        signin,
        signinWithGoogle,
        googleAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(UserContext);
};
