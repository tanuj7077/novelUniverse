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
  const [categoryListItems, setCategoryListItems] = useState(categoryList);
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  //chapterInputs
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedBook, setSelectedBook] = useState();
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
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
  const changeCategoryListItem = (e) => {
    setCategory(e.target.value);
    let newList = [];
    categoryList.forEach((item) => {
      if (item.includes(e.target.value)) {
        newList.push(item);
      }
    });
    setCategoryListItems(newList);
  };
  const handleSearch = (text) => {
    setSearchText(text);
    axios.get(`http://localhost:8000/book/searchBook/${text}`).then((res) => {
      if (res.data.data.bookList.length > 0) {
        setSearchResult(res.data.data.bookList);
      }
    });
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
  const submitBook = async () => {
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
  };
  const submitChapter = async () => {
    let Chapter = {
      bookId: selectedBook._id,
      name: chapterTitle,
      number: selectedBook.chapters.length + 1,
      story: chapterContent,
    };
    axios
      .post("http://localhost:8000/chapter/addChapter", Chapter)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
              changeCategoryListItem(e);
            }}
            onClick={() => {
              setCategoriesVisible(true);
            }}
          />
          {categoriesVisible && (
            <div className="categoryList">
              {categoryListItems.map((item) => {
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
          onClick={submitBook}
        >
          Submit
        </button>
      </div>
      <div className="addContentPage-addContent">
        <p className="addContentPage-addContent-heading">Add Chapter</p>
        <div className="addContentPage-addContent-formGrp">
          <label>Search Book</label>
          <input
            type="text"
            className="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Search Result</label>
          <div className="searchResult">
            {searchResult.map((book) => {
              return (
                <div
                  className="searchResult-content"
                  onClick={() => setSelectedBook(book)}
                >
                  {book.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Selected Book</label>
          {selectedBook && (
            <div className="selectedBook">
              <span
                className="selectedBook-img"
                style={{ backgroundImage: `url(${selectedBook.imageUrl})` }}
              ></span>
              <p className="selectedBook-text">
                <span className="name">{selectedBook.name}</span>
                <span className="chapters">
                  Chapters: {selectedBook.chapters.length}
                </span>
              </p>
            </div>
          )}
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Chapter Title</label>
          <input
            type="text"
            className="text"
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </div>
        <div className="addContentPage-addContent-formGrp">
          <label>Chapter Content</label>
          <textarea
            type="text"
            className="textarea"
            onChange={(e) => setChapterContent(e.target.value)}
          ></textarea>
        </div>
        <button
          className="addContentPage-addContent-submitBtn"
          onClick={submitChapter}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default AddContent;
