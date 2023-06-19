import React, { useState } from "react";
import { dbService, storageService } from "fBase";
import { deleteDoc, updateDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const Nweet = ({ attachmentUrl, nweetObj, isOwner, text }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm(`Are you sure you want to delete this nweet?`);
    if (ok) {
      const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
      await deleteDoc(NweetTextRef);
      if (nweetObj.attachmentUrl) {
        const urlRef = ref(storageService, nweetObj.attachmentUrl);
        await deleteObject(urlRef);
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (e) => {
    e.preventDefault();
    const NweetTextRef = await doc(dbService, "nweets", `${nweetObj.id}`);
    updateDoc(NweetTextRef, { text: newNweet });
    toggleEditing();
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewNweet(value);
  };
  return (
    <div key={nweetObj.id}>
      <h4>{nweetObj.text}</h4>
      {nweetObj.attachmentUrl && (
        <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
      )}
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
