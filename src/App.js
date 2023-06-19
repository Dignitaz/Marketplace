import React, { useParams, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import "./index.css";
import {
  Home,
  AccountSettings,
  Login,
  Rejestration,
  NewAnnoucement,
} from "./pages";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="accsettid" element={<AccountSettings />} />
        <Route path="login" element={<Login />} />
        <Route path="rejestration" element={<Rejestration />} />
        <Route path="newannoucement" element={<NewAnnoucement />} />
        {/*<Route path="addAnnoucment" element={<AddAnnoucment />} />
        <Route path="contact" element={<Annoucments/>} />
        <Route path="*" element={<Error />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
