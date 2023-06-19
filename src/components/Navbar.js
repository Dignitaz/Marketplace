import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../assets/logo-no-background.png";
import { VscAccount } from "react-icons/vsc";
import { TfiAnnouncement } from "react-icons/tfi";
import { useUserContext } from "../context/user_content";

const Navbar = () => {
  const { user } = useUserContext();
  return (
    <NavContainer>
      <div className="navMain">
        <div className="navMain__logo">
          <Link to="/">
            <img src={logo} alt="Wróc do strony głównej" />
          </Link>
        </div>
        <div className="navMain__buttons">
          <div className="navMain__buttons--account">
            <Link to={user ? "/accsettid" : "/login"}>
              <VscAccount />
              {user ? user.email : "Twoje konto"}
            </Link>
          </div>
          <div className="navMain__buttons--addannouncement">
            <Link to={user ? "/newannoucement" : "/login"}>
              <TfiAnnouncement />
              <span> Dodaj ogłoszenie</span>
            </Link>
          </div>
        </div>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  height: 7rem;
  .navMain {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    width: 100%;
    img {
      height: 80px;
      margin: 10px;
      margin-left: 30px;
    }
    &__buttons {
      display: flex;

      &--account {
        display: flex;
        flex-direction: row;
        margin: auto;
        height: 45px;
      }
      &--addannouncement {
        display: flex;
        flex-direction: row;
        margin: auto;
        height: 45px;
      }
      a {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        color: var(--accent);
        font-size: 18px;
        background-color: #fff;
        text-decoration: none;
        width: 205px;
        margin-right: 15px;
        padding: 10px;
        border-radius: 10px;
        transition: 0.3s;
        svg {
          margin-top: 1px;
          font-size: 20px;
          margin-right: 10px;
        }
      }
      a:hover {
        background-color: var(--background-hover);
      }
    }
  }
`;

export default Navbar;
