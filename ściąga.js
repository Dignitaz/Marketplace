import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { v4 } from "uuid";

const NewAnnoucement = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };

  const increaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id); //getting reference
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const uploadImage = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) =>
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        })
      );
    });
  }, []);
  return (
    <Wrapper className="page-100">
      <div className="newann">
        <input
          placeholder="Name..."
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) => {
            setNewAge(e.target.value);
          }}
        />
        <button onClick={createUser}>Create User</button>
        <h3>Nowe ogłoszenie</h3>
        {users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <button onClick={() => increaseAge(user.id, user.age)}>
                Inc Age
              </button>
              <button onClick={() => deleteUser(user.id)}>Delete user</button>
            </div>
          );
        })}

        <div className="App">
          <input
            type="file"
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <button onClick={uploadImage}>Update file</button>{" "}
          {imageList.map((url) => {
            return <img src={url} alt="somepic" />;
          })}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default NewAnnoucement;
