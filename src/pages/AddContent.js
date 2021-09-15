import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import { categoryList } from "../mockData";
import axios from "axios";
var config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app(); // if already initialized, use that one
}
var storage = firebase.storage();

function AddContent() {
  //book inputs
  const [bookName, setBookName] = useState("");
  const [bookDescription, setBookDescription] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [toSendBookImage, setToSendBookImage] = useState("");
  const [isBookImageUploaded, setIsBookImageUploaded] = useState(false);

  const [category, setCategory] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const handleImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      setToSendBookImage(e.target.files[0]);

      reader.onload = (e) => {
        setBookImage(e.target.result);
        setIsBookImageUploaded(true);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const addToCategories = (tag) => {
    let newList = [...categories];
    if (!newList.includes(tag)) {
      newList.push(tag);
      setCategories(newList);
    }
  };
  const removeFromCategories = (tag) => {
    let newList = [...categories];
    let index;
    newList.forEach((item, i) => {
      if (item === tag) {
        index = i;
      }
    });
    newList.splice(index, 1);
    setCategories(newList);
  };
  async function handleSubmit() {
    console.log("Submit pressed");
    let currentImageName = "image-" + Date.now();
    let uploadImage = storage
      .ref(`bookPhotos/${currentImageName}`)
      .put(toSendBookImage);

    uploadImage.on(
      "state-changed",
      (snapshot) => {},
      (error) => {
        alert(error);
      },
      () => {
        console.log("sent to firebase");
        storage
          .ref("bookPhotos")
          .child(currentImageName)
          .getDownloadURL()
          .then((url) => {
            console.log("url received");
            const Book = {
              name: bookName,
              author: bookAuthor,
              description: bookDescription,
              imageUrl: url,
              categories: categories,
            };
            // cons
            axios
              .post("http://localhost:8000/book/addBook", Book)
              .then((res) => {
                console.log("sent to server");
                console.log(res);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  }
  return (
    <div className="addContentPage">
      <div className="addContentPage-addContent">
        <p className="addContentPage-addContent-heading">Add Book</p>
        <div className="addContentPage-addContent-formGrp">
          <label>Book Name</label>
          <input
            type="text"
            className="text"
            onChange={(e) => {
              setBookName(e.target.value);
            }}
          />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Author</label>
          <input
            type="text"
            className="text"
            onChange={(e) => {
              setBookAuthor(e.target.value);
            }}
          />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Description</label>
          <input
            type="text"
            className="text"
            onChange={(e) => {
              setBookDescription(e.target.value);
            }}
          />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Add categories</label>
          <input
            type="text"
            className="text"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            onClick={() => {
              setCategoriesVisible(true);
            }}
          />
          {categoriesVisible && (
            <div className="categoryList">
              {categoryList.map((item) => {
                return (
                  <div
                    className="listItem"
                    onClick={() => addToCategories(item)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
          <div className="selectedCategories">
            {categories.map((item) => {
              return (
                <p
                  className="category"
                  onClick={() => {
                    removeFromCategories(item);
                  }}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Book image</label>
          <input
            id="fileInput"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleImage}
          />
          {isBookImageUploaded && (
            <div
              className="uploadedImg"
              style={{ backgroundImage: `url(${bookImage})` }}
            ></div>
          )}
        </div>
        <button
          className="addContentPage-addContent-submitBtn"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div className="addContentPage-addContent">
        <p className="addContentPage-addContent-heading">Add Chapter</p>
        <div className="addContentPage-addContent-formGrp">
          <label>Search Book</label>
          <input type="text" className="text" />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Chapter Title</label>
          <input type="text" className="text" />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Chapter Content</label>
          <textarea type="text" className="textarea"></textarea>
        </div>
        <button className="addContentPage-addContent-submitBtn">Submit</button>
      </div>
    </div>
  );
}

export default AddContent;
