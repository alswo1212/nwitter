import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, getDocs, query, onSnapshot, orderBy } from "firebase/firestore";
import { dbService } from "fBase";
import Nweet from "Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    const getNweets = async () => {
        const q = query(collection( dbService, "nweets"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
            const nweetObj = {
                ...doc.data(),
                id : doc.id
            };
            setNweets(prev => [nweetObj, ...prev]);
        })
    }

    useEffect(() => {
        getNweets();
        const q = query(collection(dbService, "nweets"), orderBy("createdAt", "desc"));
        onSnapshot(q, (snapShot) => {
            const nweetArr = snapShot.docs.map(doc => ({
                ...doc.data(),
                id : doc.id,
            }));
            setNweets(nweetArr);
        })
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                text : nweet, 
                createdAt : serverTimestamp(),
                createrId : userObj.uid,
            };
            const dbRef = await addDoc(collection(dbService, "nweets"), data);
        } catch (err) {
            console.log(err);
        }
        setNweet("");
    }

    const onChange = (e) => {
        const {target : {value}} = e;
        setNweet(value);
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input value={nweet} type="text" placeholder="What`s on your mind?" maxLength={120} onChange={onChange}/>
            <input type="submit" value="Nweet"/>
        </form>
        <div>
            {nweets.map(nweet => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.createrId === userObj.uid} test={userObj.id}/>
            ))}
        </div>
    </div>
    )
};
export default Home;