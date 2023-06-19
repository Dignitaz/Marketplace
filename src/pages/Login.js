import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_content";
import { Link } from "react-router-dom";
import bcglogo from "../assets/logo-black.png";

const LoginComponent = () => {
  const { setLoginEmail, setLoginPassword, login } = useUserContext();
  return (
    <Wrapper className="page-100">
      <div className="logindiv">
        <div className="logindiv--loginsection">
          <h2> Login </h2>
          <div className="logindiv--loginsection__inputs">
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
        </div>
        <div className="logindiv--skipsection">
          <h4> Nie posiadasz konta? </h4>
          <Link to="/rejestration"> Zarejestruj się!</Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;
  background-image: url(${bcglogo});
  background-position: center;
  background-size: cover;
  .logindiv {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--background);
    padding: 20px;
    border-radius: 10px;
    color: var(--primary);
    text-align: center;
    box-shadow: 0px 0px 10px var(--accent);
    width: 40%;
    &--loginsection {
      &__inputs {
        input {
          display: flex;
          flex-direction: column;
          border: none;
          margin-bottom: 10px;
          width: 100%;
          padding: 5px;
          border-radius: 3px;
        }
        button {
          border: none;
          padding: 5px;
          border-radius: 3px;
          background-color: var(--primary);
          transition: 0.5s;
          margin: 5px;
          color: var(--accent);
          font-size: 16px;
        }
        button:hover {
          background-color: var(--background-hover);
        }
      }
    }
    &--skipsection {
      padding-top: 5px;
    }

    h2 {
      padding-bottom: 15px;
      text-decoration: underline 3px;
    }
  }
`;

export default LoginComponent;
