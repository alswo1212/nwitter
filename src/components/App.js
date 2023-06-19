import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";
import { updateCurrentUser } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        /* setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) =>
            user.updateProfile(args, { displayName: user.displayName }),
        }); */
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    /* setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) =>
        user.updateProfile(args, { displayName: user.displayName }),
    }); */
    setUserObj({...user});
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
