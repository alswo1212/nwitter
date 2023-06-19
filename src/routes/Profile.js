import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
    const [displayName, setDisplayName] = useState(userObj.displayName ?? "");
  // const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    // navigate("/")
  };
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets")
      , where("creatorId", "==", userObj.uid)
      , orderBy("createdAt", "asc")
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChagne = (e) => {
    const {target : {value}} = e;
    setDisplayName(value);
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if(userObj.displayName !== displayName){
        await updateProfile(authService.currentUser, {displayName});
        refreshUser();
    }
  }
  return (
    <>
    <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" value={displayName} onChange={onChagne}/>
        <input type="submit" value="Update profile"/>
    </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
