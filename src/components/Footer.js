import React from "react";
import styled from "styled-components";
const Footer = () => {
  return (
    <Wrapper>
      <h5>&copy; {new Date().getFullYear()}</h5>
      <span> Przemysław Sobolewski | OLX Replica</span>
      <h5> All right reserved</h5>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: var(--background-footer);
  color: var(--primary);
  text-align: center;
  padding: 10px;
  height: 6rem;
  h5 {
    margin: 5px;
  }
`;

export default Footer;
