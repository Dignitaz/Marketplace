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
import { useUserContext } from "../context/user_content";

const NewAnnoucement = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const inputTitle = document.getElementById("titleInput");
  const inputCity = document.getElementById("cityInput");
  const inputDescription = document.getElementById("descriptionInput");
  const inputNumber = document.getElementById("numberInput");
  const inputPhoto = document.getElementById("photoInput");

  const { offerCounter, newOfferNumber } = useUserContext();

  const changeCategory = () => {
    const selectedOption = document.getElementById("categoriesSelect");
    const valueOfOption = selectedOption.value;
    setCategory(valueOfOption);
  };

  const uploadImage = async () => {
    if (imageUpload === null) return;
    // await checkForm();
    const imageRef = ref(storage, `images/offerID${offerCounter}/${v4()}`);
    uploadBytes(imageRef, imageUpload).then((snaphsot) => {
      getDownloadURL(snaphsot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };
  const checkForm = async () => {
    if (title === "") {
      inputTitle.placeholder = "You need to add title...";
      inputTitle.classList.add("warningInput");
    } else if (title.length < 5) {
      setTitle("");
      inputTitle.textContent = "";
      inputTitle.placeholder =
        "The title must to contain at least 5 characters...";
      inputTitle.classList.add("warningInput");
    } else if (city === "") {
      inputCity.placeholder = "You need to add city...";
      inputCity.classList.add("warningInput");
    } else if (description.length <= 20) {
      setDescription("");
      inputDescription.textContent = "";
      inputDescription.placeholder =
        "Desctiprion must contains at least from 20 characters...";
      inputDescription.classList.add("warningInput");
    } else if (contactNumber.length < 9) {
      setContactNumber("");
      inputNumber.textContent = "";
      inputNumber.placeholder =
        "Please type in format 123123123 or +48123123123";
      inputNumber.classList.add("warningInput");
    }
    // await addOffer();
    // inputTitle.classList.remove("warningInput");
    // inputCity.classList.remove("warningInput");
  };
  useEffect(() => {
    if (title.length >= 6) {
      inputTitle.classList.remove("warningInput");
    }
  }, [title]);

  useEffect(() => {
    if (city.length >= 1) {
      inputCity.classList.remove("warningInput");
    }
  }, [city]);

  useEffect(() => {
    if (description.length >= 1) {
      inputDescription.classList.remove("warningInput");
    }
  }, [description]);

  useEffect(() => {
    if (contactNumber.length >= 9) {
      inputNumber.classList.remove("warningInput");
    }
  }, [contactNumber]);

  return (
    <Wrapper className="page-100">
      <h3>New Offer</h3>
      <div className="newannoucementDiv">
        <p>Offer title</p>
        <input
          id="titleInput"
          placeholder="Title..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
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
          id="cityInput"
          placeholder="City..."
          onChange={(e) => {
            setCity(e.target.value);
          }}
          value={city}
        />
        <p>Describe your offer in few sentenses</p>
        <textarea
          id="descriptionInput"
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
          id="numberInput"
          type="number"
          placeholder="Set contact number..."
          onChange={(e) => {
            setContactNumber(e.target.value);
          }}
          value={contactNumber}
        />
        <p>Add photos:</p>
        <input
          id="photoInput"
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <button onClick={uploadImage}>Update file</button>
        <div>
          <h4>Uploated photos:</h4>
          <div className="newannoucementDiv__uploatedsection">
            {imageList.map((photo) => {
              return (
                <div className="newannoucementDiv__uploatedsection--img">
                  <img src={photo} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <button onClick={checkForm}> Add Offer </button>
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
  .warningInput {
    color: red;
    font-weight: bolder;
    border-color: red;
    border-radius: 5px;
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
    &__uploatedsection {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      &--img {
        position: relative;
        width: 200px;
        height: 200px;
        overflow: hidden;
        border: 3px solid var(--background-footer);
        margin: 5px 10px;
        border-radius: 5px;
        padding: 5px;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: block;
          width: 100%;
          height: auto;
        }
      }
    }
  }

  @media (min-width: none) {
  }
`;

export default NewAnnoucement;
