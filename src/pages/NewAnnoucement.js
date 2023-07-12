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
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [desctiption, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [contactNumber, setContactNumber] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState(null);

  const changeCategory = () => {
    const selectedOption = document.getElementById("categoriesSelect");
    const valueOfOption = selectedOption.value;
    setCategory(valueOfOption);
  };

  const uploadImage = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images/${title + v4()}`);
    uploadBytes(imageRef, imageUpload);
    // .then((snaphsot) => {
    //   getDownloadURL(snaphsot.ref).then((url) => {
    //     setImageList((prev) => [...prev, url]);
    //   });
    // });
  };

  return (
    <Wrapper className="page-100">
      <h3>New Offer</h3>
      <div className="newannoucementDiv">
        <p>Offer title</p>
        <input
          placeholder="Title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label for="cars">Choose offer category</label>
        <select
          id="categoriesSelect"
          onChange={() => changeCategory()}
          defaultValue=""
        >
          <option value="car">Cars</option>
          <option value="clothes">Clothes</option>
          <option value="electronic">Electronic</option>
          <option value="home and Garden">Home and Garden</option>
          <option value="properties">Properties</option>
        </select>
        <p>Set city</p>
        <input
          placeholder="City..."
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <p>Describe your offer in few sentenses</p>
        <textarea
          placeholder="Product description..."
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Set price - PLN</p>
        <input
          type="number"
          placeholder="Set price..."
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <p>Set your contact number</p>
        <input
          type="number"
          placeholder="Set contact number..."
          onChange={(e) => {
            setContactNumber(e.target.value);
          }}
        />
        <p>Add photos:</p>
        <input type="file" onChange={(e) => setImageUpload(e.target.files)} />
        <button onClick={uploadImage}>Update file</button>
        <div>
          <h4>Uploated photos:</h4>
          <div className="">
            {/* {imageList.map((photo) => {
              <img src={`sdsad`} />;
            })} */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: auto;
  h3 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .newannoucementDiv {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    input,
    textarea,
    select {
      margin: 10px;
      padding: 5px;
    }
    button {
      margin: 0 auto 20px;
      width: 30%;
    }
  }
  @media (min-width: none;) {
  }
`;

export default NewAnnoucement;
