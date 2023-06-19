import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsFillHouseFill, BsPhone } from "react-icons/bs";
import { AiFillCar } from "react-icons/ai";
import { GiClothes } from "react-icons/gi";

const Categories = () => {
  return (
    <Wrapper>
      <h1> Kategorie </h1>
      <div className="underline"></div>
      <div className="categories">
        <div className="categories__firstline">
          <Link to="/">
            <div className="categories__firstline--element">
              <p>
                <BsFillHouseFill /> Nieruchomości
              </p>
            </div>
          </Link>
          <Link to="/">
            <div className="categories__firstline--element">
              <p>
                <AiFillCar /> Pojazdy
              </p>
            </div>
          </Link>
          <Link to="/">
            <div className="categories__firstline--element">
              <p>
                <BsPhone /> Elektronika
              </p>
            </div>
          </Link>
        </div>
        <div className="categories__firstline">
          <Link to="/">
            <div className="categories__firstline--element">
              <p>
                <GiClothes /> Moda
              </p>
            </div>
          </Link>
          <Link to="/">
            <div className="categories__firstline--element">
              <p>
                <BsFillHouseFill /> Dom i Ogród
              </p>
            </div>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  h1 {
    text-align: center;
    text-decoration: 3px underline var(--accent);
    padding-top: 10px;
    padding-bottom: 20px;
    font-size: 30px;
  }
  .categories {
    width: 80%;
    margin: auto;
    &__firstline {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      &--element {
        position: relative;
        padding: 5px;
        background-color: var(--background);
        width: 250px;

        height: 60px;
        border-radius: 10px;
        transition: 0.5s;
        margin-bottom: 20px;
        p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: var(--primary);
          text-decoration: none;
          width: 100%;
          font-size: 20px;
          text-align: center;
        }
      }
      &--element:hover {
        background-color: var(--background-hover);
      }
    }
  }
`;
export default Categories;
