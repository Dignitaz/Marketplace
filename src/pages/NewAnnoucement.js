import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const NewAnnoucement = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: newAge });
  };
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
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
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default NewAnnoucement;
