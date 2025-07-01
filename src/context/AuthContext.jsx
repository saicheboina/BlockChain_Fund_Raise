import React, { useEffect, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { useNavigate } from "react-router";
import { collection, onSnapshot } from "firebase/firestore";
import { createUserInDb, fetchUser } from "../api/api";
import Loader from "@/components/common/Loader";
import toast from "react-hot-toast";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  // const location = useLocation();
  const timeout = useRef();
  async function login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        navigate("/");
      }
      return true;
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      setErrorMessage("Invalid Email/Password");
      return false;
    }
  }

  function register({ email, password, name, role }) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(true);
        // Signed in
        const user = userCredential.user;
        createUserInDb({
          email,
          uid: user?.uid,
          name,
          transactions: [],
          role,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        if (errorCode === "auth/weak-password") {
          setErrorMessage("Password is Weak");
        } else {
          setErrorMessage(errorMessage);
        }
      });
  }
  async function resetPassword(email) {
    try {
      const data = await sendPasswordResetEmail(auth, email);
      return data;
    } catch (error) {
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      return false;
    }
  }
  function signOutUser() {
    signOut(auth)
      .then(() => {
        console.log("Sign Out Sucessfull");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const subscription = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      setIsLoading(true);
      if (user != null) {
        const usr = await fetchUser(user?.uid);
        setIsAuthenticated(true);
        setUser({ ...usr, emailVerified: user.emailVerified });

        toast.success("You logged in as " + usr.role + " 🎊");
        navigate("/");
      } else {
        setIsAuthenticated(false);
        console.log("😢 We are not authenticated!");
      }
      setIsLoading(false);
    });
    return () => {
      subscription();
      clearTimeout(timeout.current);
    };
  }, []);

  const setErrorMessage = (err) => {
    setError(err);
    if (timeout.current) {
      console.log(timeout.current);
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    console.log("Subscribing to campaign updates...");

    const unsubscribe = onSnapshot(
      collection(db, "campaigns"),
      (querySnapshot) => {
        const fetchedEvents = [];
        querySnapshot.forEach((doc) => {
          fetchedEvents.push(doc.data());
        });

        // Update state with the latest campaigns
        setCampaigns(fetchedEvents);
        setAllCampaigns(fetchedEvents);
      }
    );

    // Clean up the subscription on unmount
    return () => {
      console.log("Unsubscribing from campaign updates...");
      unsubscribe();
    };
  }, [user]);
  useEffect(() => {
    console.log("Subscribing to campaign updates...");

    const unsubscribe = onSnapshot(
      collection(db, "transactions"),
      (querySnapshot) => {
        const fetchedEvents = [];
        querySnapshot.forEach((doc) => {
          fetchedEvents.push(doc.data());
        });

        // Update state with the latest campaigns
        setAllTransactions(fetchedEvents);
      }
    );

    // Clean up the subscription on unmount
    return () => {
      console.log("Unsubscribing from campaign updates...");
      unsubscribe();
    };
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signOutUser,
        login,
        error,
        campaigns,
        setCampaigns,
        register,
        allCampaigns,
        setUser,
        resetPassword,
        allTransactions,
      }}
    >
      {!isLoading ? children : <Loader />}
    </AuthContext.Provider>
  );
};
