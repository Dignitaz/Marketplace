import React from "react";
import { Categories, RandomAnnoucments } from "../components/index";

const Home = () => {
  return (
    <main className="page-100">
      <Categories />
      <RandomAnnoucments />
    </main>
  );
};

export default Home;
