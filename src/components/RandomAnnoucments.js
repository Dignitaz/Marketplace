import React from "react";
// import styled from "styled-components";
import { useUserContext } from "../context/user_content";

const RandomAnnoucments = () => {
  const {
    setRegisterEmail,
    setRegisterPassword,
    register,
    setLoginEmail,
    setLoginPassword,
    login,
    user,
    logout,
  } = useUserContext();
  return (
    <div className="App">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}> Login</button>
      </div>
      <h4> User Logged In: </h4>
      {user ? user.email : "Logout"}
      <button onClick={logout}> Sign Out </button>
    </div>
  );
};

// const Wrapper = styled.section``;
export default RandomAnnoucments;
